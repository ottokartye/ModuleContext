/// <reference path="../../typings/index.d.ts" />
"use strict";
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
        let mainValidator = true, groupValidator = true;
        if (!!rule.main) {
            if (rule.main instanceof Array) {
                mainValidator = rule.main.indexOf(context.main) > -1;
            }
            else {
                mainValidator = rule.main === context.main;
            }
        }
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
        return mainValidator && groupValidator;
    });
}
exports.findRule = findRule;
exports.mainValidator = (rule, context) => {
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
};
exports.groupValidator = (rule, context) => {
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
        return true;
    }
    return false;
};
/**
 * Check if groups array contains at least one element from oneArray
 * @param  {string[]} groups
 * @param  {string[]} oneArray
 * @returns boolean
 */
function arrayContainsOne(groups, oneArray) {
    let currentElement;
    currentElement = oneArray.find((value) => {
        console.log('checking ' + value + ' in ' + groups);
        return value in groups;
    });
    console.log('returning ' + currentElement);
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
        return !(value in groups);
    });
    return !currentElement;
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
        return (value in groups);
    });
    return !currentElement;
}
exports.arrayContainsNone = arrayContainsNone;
function arrayContainsAll_cached(groups, allArray) {
    let biggestArray;
    let smallestArray;
    if (groups.length < allArray.length) {
        biggestArray = allArray;
        smallestArray = groups;
    }
    else {
        biggestArray = groups;
        smallestArray = allArray;
    }
    let hashCache = {};
    biggestArray.forEach((value) => {
        hashCache[value] = true;
    });
    let hasFind = smallestArray.find((value) => {
        return !(value in hashCache);
    });
    return !hasFind;
}
function arrayContainsNone_cached(groups, allArray) {
    let biggestArray;
    let smallestArray;
    if (groups.length < allArray.length) {
        biggestArray = allArray;
        smallestArray = groups;
    }
    else {
        biggestArray = groups;
        smallestArray = allArray;
    }
    let hashCache = {};
    biggestArray.forEach((value) => {
        hashCache[value] = true;
    });
    let hasFind = smallestArray.find((value) => {
        return !(value in hashCache);
    });
    return !hasFind;
}