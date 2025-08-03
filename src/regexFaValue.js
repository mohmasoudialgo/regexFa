/**
 * Validate value based on Iranian formats like nationalId and postCode.
 *
 * @param {Object} options
 * @param {"nationalId"|"postCode"} options.type - Type of value to validate.
 * @param {string|number} options.value - The value to validate.
 * @returns {boolean}
 */
export default function regexValue({ type, value }) {
  if (value == null) return false;
  const str = String(value).trim();

  switch (type) {
    case 'nationalId': {
      if (!/^\d+$/.test(str)) return false;
      if (str.length < 8 || str.length > 10) return false;

      const padded = str.padStart(10, '0');
      if (/^(\d)\1{9}$/.test(padded)) return false;

      const digits = Array.from(padded, Number);
      const checkDigit = digits[9];
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += digits[i] * (10 - i);
      }

      const mod = sum % 11;
      const expected = (mod < 2 ? mod : 11 - mod);
      return expected === checkDigit;
    }

    case 'postCode': {
      const clean = str.replace('-', '');
      if (!/^\d{10}$/.test(clean)) return false;
      if (/^(\d)\1{9}$/.test(clean)) return false;

      const pattern = /^(?!.*(\d)\1{3})[13-9]{4}[1346-9][0-9]{5}$/;
      return pattern.test(clean);
    }

    default:
      throw new Error(`Invalid validation type: ${type}`);
  }
}
