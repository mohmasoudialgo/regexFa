/**
 * Generate a regex pattern for matching Persian numbers.
 *
 * @param {Object} options
 * @param {"basic"|"strict"|"extended"} [options.type="basic"] - Type of regex to generate.
 * @param {number} [options.min=0] - Minimum allowed length.
 * @param {number} [options.max=30] - Maximum allowed length.
 * @returns {RegExp}
*/

export default function regexFaNum({ type = "basic", min = 1, max = 999999 } = {}) {
  let pattern = "";

  switch (type) {
    case "basic":
    // فقط اعداد فارسی مجاز هستند

        pattern = `^[\\u06F0-\\u06F9]{${min},${max}}$`;
        break;

    case "strict":
      // فقط اعداد فارسی مجاز هستند
      // فقط فاصله بین اعداد مجاز است

        pattern = `^(?=.{${min},${max}}$)[\\u06F0-\\u06F9]+( +[\\u06F0-\\u06F9]+)*$`;
        break;

    case "extended":
      // فقط اعداد فارسی و انگلیسی مجازند
      // علامت‌های خاص مجازند (در بین رشته)
      // فقط فاصله بین اعداد مجاز است
      
        pattern = `^[0-9۰-۹](?:[0-9۰-۹ .,!؟\\-_:;@#$%^&*()+=\\[\\]{}"'\\/\\\\|<>~\\s]*[0-9۰-۹])?$`;
        break;

    default:
      throw new Error(`Invalid number regex type: ${type}`);
  }

  return new RegExp(pattern);
}