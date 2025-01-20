export const normalizeURL = (url: string): string => {
  const [base, queryString] = url.split('?');
  if (!queryString) return url;

  const params = new URLSearchParams(queryString);
  const sortedParams = Array.from(params.entries()).sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB),
  );

  const normalizedQueryString = sortedParams
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${base}?${normalizedQueryString}`;
};
