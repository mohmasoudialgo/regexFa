/**
 * Generate regex pattern for English-based usernames or similar identifiers.
 *
 * @param {Object} options
 * @param {"basic"|"alpha"|"strict"|"extended"|"custom"} [options.type="alpha"]
 * @param {number} [options.min=3]
 * @param {number} [options.max=30]
 * @param {string|RegExp} [options.customPattern] - Required if type is "custom"
 * @returns {RegExp}
 */
export default function regexUsername({
  type = "alphanumeric",
  min = 3,
  max = 30,
  customPattern
} = {}) {
  let pattern = "";

  switch (type) {
    case "basic":
      // فقط حروف بزرگ و کوچک
      pattern = `^[a-zA-Z]{${min},${max}}$`;
      break;

    case "alpha":
      // حروف و اعداد بدون علامت خاص
      pattern = `^[a-zA-Z0-9]{${min},${max}}$`;
      break;

    case "strict":
      // حروف، اعداد، آندرلاین و نقطه (ابتدا یا انتها یا دوبل نقطه مجاز نیست)
      pattern = `^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]{${min},${max}}(?<![_.])$`;
      break;

    case "extended":
      // فقط حروف کوچک، عدد، آندرلاین (نه نقطه)، شروع با حرف
      pattern = `^[a-z][a-z0-9_]{${min - 1},${max - 1}}$`;
      break;

    case "custom":
      // استفاده از الگوی سفارشی
      if (!customPattern) {
        throw new Error(`Custom pattern must be provided for type: "${type}"`);
      }
      return new RegExp(customPattern);

    default:
      throw new Error(`Invalid username regex type: "${type}"`);
  }

  return new RegExp(pattern);
}
