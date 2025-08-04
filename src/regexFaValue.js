/**
 * Validate value based on Iranian formats like nationalId and postCode.
 *
 * @param {Object} options
 * @param {"nationalId"|"postCode"|"mobile"|"cardNumber"|"sheba"} options.type - Type of value to validate.
 * @param {string|number} options.value - The value to validate.
 * @returns {boolean}
 */
export default function regexValue({ type, value }) {
  if (value == null) return false;
  let str = String(value).trim();

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

    case 'mobile': {
      str = str.replace(/^(\+98|0098)/, '0');
      return /^09\d{9}$/.test(str);
    }

    case 'cardNumber': {
      const clean = str.replace(/[\s-]/g, '');
      if (!/^\d{16}$/.test(clean)) return false;
      if (/^(\d)\1{15}$/.test(clean)) return false;

      const digits = clean.split('').map(Number);
      let sum = 0;

      for (let i = 0; i < 16; i++) {
        let digit = digits[i];
        if (i % 2 === 0) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }
        sum += digit;
      }

      return sum % 10 === 0;
    }

    case 'sheba': {
      const clean = str.toUpperCase().replace(/\s|-/g, '');
      if (!/^IR\d{22}$/.test(clean)) return false;

      const rearranged = clean.slice(4) + clean.slice(0, 4);

      const converted = rearranged.replace(/[A-Z]/g, ch => (ch.charCodeAt(0) - 55));

      let remainder = converted;
      let block = '';

      while (remainder.length > 2) {
        block = remainder.slice(0, 9); // حداکثر 9 رقم
        remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
      }

      const isValid = parseInt(remainder, 10) % 97 === 1;
      return isValid;
  }

    default:
      throw new Error(`Invalid validation type: ${type}`);
  }
}
