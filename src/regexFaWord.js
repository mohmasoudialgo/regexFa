/**
 * Generate a regex pattern for matching Persian words.
 *
 * @param {Object} options
 * @param {"basic"|"strict"} [options.type="basic"] - Type of regex to generate.
 * @param {number} [options.minLen=0] - Minimum allowed length.
 * @param {number} [options.maxLen=30] - Maximum allowed length.
 * @returns {RegExp}
 */
export default function regexFaWord({ type = "basic", minLen = 2, maxLen = 30 } = {}) {
  let pattern = "";

  switch (type) {
    case "basic":
      // Only Persian letters and spaces
      pattern = `^[\\u0600-\\u06CC]{${minLen},${maxLen}}$`;
      break;

    case "strict":
      // Persian letters and Persian digits, digits not allowed at beginning,
      // No English, no special characters, no leading/trailing space
      pattern = `^(?!\\s)(?![۰-۹])[\\u0600-\\u06FF۰-۹\\s]{${minLen},${maxLen}}(?<!\\s)$`;
      break;

    default:
      throw new Error(`Invalid word regex type: ${type}`);
  }

  return new RegExp(pattern);
}
