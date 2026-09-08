export function projectSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "");
}
