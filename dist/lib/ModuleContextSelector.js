/// <reference path="../../typings/index.d.ts" />
"use strict";
function mainValidator(rule, context) {
    let mainValidator = true;
    if (!!rule.main) {
        if (rule.main instanceof Array) {
            mainValidator = rule.main.indexOf(context.main) > -1;
        }
        else {
            mainValidator = rule.main === context.main;
        }
    }
    return mainValidator;
}
exports.mainValidator = mainValidator;
;
function groupValidator(rule, context) {
    if (!!rule.groups) {
        // Check if all properties are set or only some
        // Check if one property is set
        if (!!rule.groups.one && !arrayContainsOne(context.groups, rule.groups.one)) {
            return false;
        }
        // Check if all property is set
        if (!!rule.groups.all && !arrayContainsAll(context.groups, rule.groups.all)) {
            return false;
        }
        // Check if none property is set
        if (!!rule.groups.none && !arrayContainsNone(context.groups, rule.groups.none)) {
            return false;
        }
    }
    return true;
}
exports.groupValidator = groupValidator;
;
/**
 * Load modules contained in IModuleContext if rules apply
 * @param  {IModuleContext[]} rules
 * @param  {IContext} context
 */
function load(rules, context) {
    // Check if context matches any rule
    let selectedRule = findRule(rules, context);
    if (!selectedRule) {
        return;
    }
    let modules = require(selectedRule.module);
    if (!!selectedRule.onLoadedModule) {
        selectedRule.onLoadedModule.apply(selectedRule, modules);
    }
}
exports.load = load;
;
function findRule(rules, context) {
    return rules.find((rule) => {
        let mainValidatorResult = mainValidator(rule, context);
        let groupValidatorResult = groupValidator(rule, context);
        return mainValidatorResult && groupValidatorResult;
    });
}
exports.findRule = findRule;
/**
 * Check if groups array contains at least one element from oneArray
 * @param  {string[]} groups
 * @param  {string[]} oneArray
 * @returns boolean
 */
function arrayContainsOne(groups, oneArray) {
    let currentElement;
    currentElement = oneArray.find((value) => {
        return groups.indexOf(value) > -1;
    });
    return !!currentElement;
}
exports.arrayContainsOne = arrayContainsOne;
/**
 * Check if groups array contains all elements from allArray
 * @param  {string[]} groups
 * @param  {string[]} allArray
 * @returns boolean
 */
function arrayContainsAll(groups, allArray) {
    let currentElement = allArray.find((value) => {
        return groups.indexOf(value) === -1;
    });
    if (currentElement) {
        return false;
    }
    return true;
}
exports.arrayContainsAll = arrayContainsAll;
/**
 * Check if groups array does not contain any of the elements in noneArray
 * @param  {string[]} groups
 * @param  {string[]} noneArray
 * @returns boolean
 */
function arrayContainsNone(groups, noneArray) {
    let currentElement = noneArray.find((value) => {
        return groups.indexOf(value) > -1;
    });
    if (currentElement) {
        return false;
    }
    return true;
}
exports.arrayContainsNone = arrayContainsNone;
