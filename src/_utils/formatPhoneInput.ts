/**
 * Filters phone input to:
 * - prevent leading zero
 * - remove non-digit characters
 */
export function formatPhoneInput(input: string): string {
  // Disallow first character being 0
  if (input.length === 1 && input === "0") {
    return "";
  }

  // Remove all non-digit characters
  return input.replace(/\D/g, "");
}
