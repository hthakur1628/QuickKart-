/**
 * Formats a number into Indian Rupee (INR) currency string
 * Example: 120 -> "₹120"
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}
