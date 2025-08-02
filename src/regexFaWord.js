/**
 * Generate a regex pattern for matching Persian words.
 *
 * @param {Object} options
 * @param {"basic"} [options.type="basic"] - Type of regex to generate.
 * @param {number} [options.minLen=0] - Minimum allowed length.
 * @param {number} [options.maxLen=30] - Maximum allowed length.
 * @returns {RegExp}
 */
export default function regexFaWord({ type = "basic", minLen = 2, maxLen = 30 } = {}) {
  let pattern = "";

  switch (type) {
    case "basic":
      // Only Persian letters and spaces
      pattern = `^[\\u0600-\\u06FF\\s]{${minLen},${maxLen}}$`;
      break;

    default:
      throw new Error(`Invalid word regex type: ${type}`);
  }

  return new RegExp(pattern);
}
