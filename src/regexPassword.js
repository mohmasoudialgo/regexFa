/**
 * Generate regex pattern for password validation.
 *
 * @param {Object} options
 * @param {"weak"|"normal"|"strong"|"veryStrong"} [options.type="normal"] - Password strength type.
 * @param {number} [options.min=6] - Minimum length.
 * @param {number} [options.max=128] - Maximum length.
 * @returns {RegExp}
 */
export default function regexPass({ type = "weak", min = 2, max = 256 } = {}) {
    let pattern = "";

  switch (type) {
    case "weak":
      // هر کاراکتری، حداقل طول min تا max
      pattern = `^[\\s\\S]{${min},${max}}$`;
      break;

    case "normal":
      // هر کاراکتری، حداقل یک عدد
      pattern = `^(?=.*\\d)[\\s\\S]{${min},${max}}$`;
      break;

    case "strong":
      // هر کاراکتری، حداقل یک عدد و یک حرف بزرگ
      pattern = `^(?=.*\\d)(?=.*[A-Z])[\\s\\S]{${min},${max}}$`;
      break;

    case "veryStrong":
      // هر کاراکتری، حداقل یک عدد، یک حرف بزرگ و یک کاراکتر خاص
      pattern = `^(?=.*\\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\\\|,.<>/?])[\\s\\S]{${min},${max}}$`;
      break;

    default:
      throw new Error(`Invalid password regex type: ${type}`);
  }

  return new RegExp(pattern);
}