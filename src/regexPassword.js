/**
 * Generate regex pattern for password validation.
 *
 * @param {Object} options
 * @param {"weak"|"normal"|"strong"|"veryStrong"|"custom"} [options.type="normal"] - Password strength type.
 * @param {number} [options.min=6] - Minimum length.
 * @param {number} [options.max=128] - Maximum length.
 * @param {string|RegExp} [options.newPattern] - Custom regex pattern (required for type: "custom").
 * @returns {RegExp}
 */
export default function regexPass({ type = "weak", min = 2, max = 256 , newPattern: customPattern } = {}) {
    let pattern = "";

  switch (type) {
    case "weak":
      // هر کاراکتری، حداقل یک حرف
      pattern = `^[\\s\\S]{${min},${max}}$`;
      break;

    case "normal":
      // هر کاراکتری، حداقل یک عدد
      pattern = `^(?=.*\\d)(?=.*[a-zA-Z])[\\s\\S]{${min},${max}}$`;
      break;

    case "strong":
      // هر کاراکتری، حداقل یک عدد و یک حرف بزرگ
      pattern = `^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\\\|,.<>/?])[\\s\\S]{${min},${max}}$`;
      break;

    case "veryStrong":
      // هر کاراکتری، حداقل یک عدد، یک حرف بزرگ و یک کاراکتر خاص
      pattern = `^(?=.*\\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\\\|,.<>/?])[\\s\\S]{${min},${max}}$`;
      break;

    case "custom":
      // استفاده از الگوی سفارشی
      if (!customPattern) {
        throw new Error(`Custom pattern must be provided for type: "${type}"`);
      }
      return typeof customPattern === "string" ? new RegExp(customPattern) : customPattern;

    default:
      throw new Error(`Invalid password regex type: ${type}`);
  }

  return new RegExp(pattern);
}
