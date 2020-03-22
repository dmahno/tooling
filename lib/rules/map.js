/**
 * @fileoverview General map for Array and Objects
 * @author Dmitry
 */
'use strict';

const _ = require('lodash/fp');
const enhance = require('./core/fi');

module.exports = {
  meta: {
    docs: {
      description: 'General map for Array and Objects',
      category: 'Code auto fix',
      recommended: false
    },
    fixable: 'code',
    schema: []
  },

  create: function(context) {
    const info = enhance();
    const isMapCall = info.helpers.isMethodCallOf('map');
    function isLodashMapMethod(node) {
      return isMapCall(node.arguments[0]);
    }
    function isFirstParameterAnAnArray(node) {
      const firstParameter = node.arguments[1];
      return Array.isArray(firstParameter);
    }
    return info.merge({
      CallExpression(node) {
        if (isLodashMapMethod(node)) {
          if (isFirstParameterAnAnArray(node)) {
            context.report({
              node,
              message: 'Prefer `Array.map()` over `_.map`for arrays'
              /*  
                    fix: function(fixer) {
                        return fixer.replaceText(node, "array.map()");
                    }
              */
            });
          } else {
            // Do nothing
          }
        }
      }
    });
  }
};
