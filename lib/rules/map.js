/**
 * @fileoverview General map for Array and Objects
 * @author Dmitry
 */
'use strict';

const _ = require('lodash/fp');
// const enhance = require('./core/fi');

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

  create: context => {
    return {
      CallExpression(node) {
        // Find all `_.map(...)` expressions
        if (
          node.type === 'CallExpression' &&
          node.callee.property &&
          node.callee.property.name === 'map' &&
          node.callee.object.name === '_'
        ) {
          // Checking arguments
          const collectionNode = node.arguments[0];
          const collection = context.getSource(collectionNode);
          const fnNode = node.arguments[1];
          const fn = context.getSource(fnNode);

          // if there is an object for the first argument _.map (go out)
          if (collectionNode.type === 'ObjectExpression') return;

          // check if there is an array before _.map
          const ancestors = context.getAncestors(node);
          const isArrayCondition = `Array.isArray(${collection})`;
          const isArrayExist = ancestors.some(ancestor => {
            const isConditionNode =
              ancestor.type === 'IfStatement' ||
              ancestor.type === 'ConditionalExpression';
            const isConditionCorrect =
              context.getSource(ancestor.test) === isArrayCondition;
            return isConditionNode && isConditionCorrect;
          });

          // If there are any verifications before _.map - go out
          if (isArrayExist) return;

          // in other cases there is a warn and we replace _.map
          let message, code;

          // if there is an Array for the first argument in _.map п(we change it ti the native) map
          if (collectionNode.type === 'ArrayExpression') {
            message =
              'Lodash method "map" can be replaced to js native method "map"';
            code = `${collection}.map(${fn})`;
          }
          // In other cases we replace _.map for `isArray` verification
          else {
            message =
              'Lodash method "map" can be replaced to js native method "map" (through condition)';
            code = `Array.isArray(${collection}) ? ${collection}.map(${fn}) : _.map(${collection}, ${fn})`;
          }

          // Here is an output warning
          context.report({
            node,
            message: message,
            fix: function(fixer) {
              return fixer.replaceText(node, code.toString());
            }
          });
        }
      }
    };
  }
};
