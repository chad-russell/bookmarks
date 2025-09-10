import { getFaviconUrl } from '@/lib/favicon';

describe('Favicon Utility', () => {
  it('should return a valid Google favicon URL for a standard URL', () => {
    const url = 'https://github.com/facebook/react';
    const expected = 'https://www.google.com/s2/favicons?domain=github.com&sz=64';
    expect(getFaviconUrl(url)).toBe(expected);
  });

  it('should correctly extract the hostname from a complex URL', () => {
    const url = 'https://www.some-domain.co.uk:8080/path/to/page?query=string#hash';
    const expected = 'https://www.google.com/s2/favicons?domain=www.some-domain.co.uk&sz=64';
    expect(getFaviconUrl(url)).toBe(expected);
  });

  it('should return the default favicon path for an invalid URL', () => {
    const url = 'not-a-valid-url';
    const expected = '/default-favicon.png';
    expect(getFaviconUrl(url)).toBe(expected);
  });

  it('should return the default favicon path for an empty string', () => {
    const url = '';
    const expected = '/default-favicon.png';
    expect(getFaviconUrl(url)).toBe(expected);
  });
});
