/** Build a Formspree endpoint, or return undefined when the id is missing. */
export function formspreeEndpoint(id: string | undefined) {
  const trimmed = id?.trim();
  if (!trimmed) return undefined;
  return `https://formspree.io/f/${trimmed}`;
}
