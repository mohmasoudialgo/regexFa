/**
 * Generate a regex pattern for matching Persian words.
 *
 * @param {Object} options
 * @param {"basic"|"strict"} [options.type="basic"] - Type of regex to generate.
 * @param {number} [options.min=0] - Minimum allowed length.
 * @param {number} [options.max=30] - Maximum allowed length.
 * @returns {RegExp}
 */
export default function regexFaWord({ type = "basic", min = 1, max = 999999 } = {}) {
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

    default:
      throw new Error(`Invalid word regex type: ${type}`);
  }

  return new RegExp(pattern);
}
