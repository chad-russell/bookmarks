# Container Deployment Guide

This guide explains how to build and deploy the bookmark application using Docker/Podman and Kubernetes.

## Quick Start

### Building the Container

```bash
# Using Docker
docker build -t bookmark-app -f Containerfile .

# Using Podman
podman build -t bookmark-app -f Containerfile .
```

### Running Locally

#### With Docker Compose
```bash
# Start the application with persistent storage
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

#### With Docker/Podman directly
```bash
# Create a volume for data persistence
docker volume create bookmark-data

# Run the container
docker run -d \
  --name bookmark-app \
  -p 3000:3000 \
  -v bookmark-data:/app/data \
  bookmark-app

# Using Podman
podman run -d \
  --name bookmark-app \
  -p 3000:3000 \
  -v bookmark-data:/app/data \
  bookmark-app
```

#### With local data directory
```bash
# Ensure the data directory exists and has proper permissions
mkdir -p ./data

# Run with local data directory mounted
docker run -d \
  --name bookmark-app \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  bookmark-app
```

## Kubernetes Deployment

### Prerequisites
- A Kubernetes cluster
- `kubectl` configured to access your cluster
- A container registry (optional, for custom images)

### Deploy to Kubernetes

1. **Build and push the image (if using a registry):**
   ```bash
   # Build for your platform
   docker build -t your-registry/bookmark-app:latest -f Containerfile .
   
   # Push to registry
   docker push your-registry/bookmark-app:latest
   ```

2. **Update the Kubernetes manifest:**
   - Edit `kubernetes-manifests.yml`
   - Replace `your-registry/bookmark-app:latest` with your image
   - Replace `your-domain.com` with your actual domain
   - Adjust storage class and size as needed

3. **Deploy:**
   ```bash
   kubectl apply -f kubernetes-manifests.yml
   ```

4. **Check deployment status:**
   ```bash
   kubectl get pods -l app=bookmark-app
   kubectl get pvc bookmark-data-pvc
   kubectl get svc bookmark-app-service
   ```

5. **Access the application:**
   ```bash
   # Port forward for testing
   kubectl port-forward svc/bookmark-app-service 3000:80
   
   # Or check the ingress (if configured)
   kubectl get ingress bookmark-app-ingress
   ```

## Container Features

### Multi-stage Build
- **Dependencies stage**: Installs only production dependencies
- **Builder stage**: Builds the Next.js application
- **Runner stage**: Minimal production image with only necessary files

### Security
- Runs as non-root user (`nextjs:nodejs`)
- Uses Alpine Linux for minimal attack surface
- Proper file permissions for data directory

### Volume Configuration
- Data directory (`/app/data`) is configured as a volume
- Contains the `bookmarks.yml` file for persistent storage
- Preserves bookmarks across container restarts and updates

### Health Checks
- HTTP health check on `/api/bookmarks` endpoint
- Configurable timeouts and retry logic
- Supports Kubernetes liveness and readiness probes

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node.js environment |
| `PORT` | `3000` | Port the application listens on |
| `HOSTNAME` | `0.0.0.0` | Hostname to bind to |
| `NEXT_TELEMETRY_DISABLED` | `1` | Disable Next.js telemetry |

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs bookmark-app

# Check if port is available
netstat -tlnp | grep 3000
```

### Data not persisting
```bash
# Verify volume mount
docker inspect bookmark-app | grep -A 10 "Mounts"

# Check volume exists
docker volume ls | grep bookmark
```

### Kubernetes pod issues
```bash
# Check pod events
kubectl describe pod -l app=bookmark-app

# Check logs
kubectl logs -l app=bookmark-app

# Check PVC status
kubectl describe pvc bookmark-data-pvc
```

### Permission issues with data directory
```bash
# Fix ownership (run as root temporarily)
docker run --rm -v bookmark-data:/app/data -u 0 bookmark-app chown -R 1001:1001 /app/data
```

## Development

For local development, continue using:
```bash
pnpm dev
```

The container is optimized for production deployment and includes the Next.js standalone output for minimal image size and fast startup times.
