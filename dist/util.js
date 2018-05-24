'use strict';

/**
 *
 * @param {string} filename
 * @return {string} namespace
 */

function produceNamespace(filename) {
  return filename.replace(/\.[j|t]s(x?)/, '');
}

exports.produceNamespace = produceNamespace;