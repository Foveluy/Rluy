/**
 *
 * @param {string} filename
 * @return {string} namespace
 */

export function produceNamespace(filename) {
  return filename.replace(/\.[j|t]s(x?)/, '')
}
