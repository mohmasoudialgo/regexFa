/**
 * Generate a regex pattern for matching Persian words.
 *
 * @param {Object} options
 * @param {"basic"|"strict"|"extended"|"custom"} [options.type="basic"] - Type of regex to generate.
 * @param {number} [options.min=0] - Minimum allowed length.
 * @param {number} [options.max=30] - Maximum allowed length.
 * @param {string|RegExp} [options.customPattern] - Custom regex pattern (required for type: "custom").
 * @returns {RegExp}
 */
export default function regexFaWord({ type = "basic", min = 1, max = 999999 , customPattern } = {}) {
  let pattern = "";

  switch (type) {
    case "basic":
    // فقط حروف فارسی مجاز هستند
    // فقط فاصله بین حروف مجاز است
      
      pattern = `^(?! )[\\u0600-\\u06CC ]{${min},${max}}(?<! )$`;
      break;

    case "strict":
    // فقط حروف فارسی مجاز هستند
    // فقط اعداد فارسی مجاز، ولی نباید در ابتدای رشته باشند
    // فقط فاصله بین حروف مجاز است
    
      pattern = `^(?! )[\\u0600-\\u06FF](?:(?:[\\u0600-\\u06FF\\u06F0-\\u06F9]| +(?=[\\u0600-\\u06FF])){${min-1},${max-1}})(?<! )$`;
      break;

    case "extended":
    // فقط حروف فارسی مجاز هستند
    // فقط اعداد فارسی و انگلیسی مجازند، ولی نباید در ابتدای رشته باشند
    // علامت‌های خاص مجازند (در بین رشته)
    // فقط فاصله بین حروف مجاز است

      pattern = `^[\\u0600-\\u06FF](?:[\\u0600-\\u06FF0-9۰-۹.,!؟\\-_:;@#$%^&*()+=\\[\\]{}"'\\/\\\\|<>~\\s]*[\\u0600-\\u06FF0-9۰-۹.,!؟\\-_:;@#$%^&*()+=\\[\\]{}"'\\/\\\\|<>~])?$`;
      break;

    case "custom":
    // استفاده از الگوی سفارشی
    // اگر نوع "custom" انتخاب شده باشد، باید یک الگوی سفارشی ارائه شود

      if (!customPattern) {
        throw new Error(`Custom pattern must be provided for type: "${type}"`);
      }
      return typeof customPattern === "string" ? new RegExp(customPattern) : customPattern;

    default:
      throw new Error(`Invalid word regex type: ${type}`);
  }

  return new RegExp(pattern);
}
