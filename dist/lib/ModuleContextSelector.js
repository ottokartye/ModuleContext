/// <reference path="../../typings/index.d.ts" />
"use strict";
const ArrayValidators_1 = require('./ArrayValidators');
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
        if (!!rule.groups.one && !ArrayValidators_1.arrayContainsOne(context.groups, rule.groups.one)) {
            return false;
        }
        // Check if all property is set
        if (!!rule.groups.all && !ArrayValidators_1.arrayContainsAll(context.groups, rule.groups.all)) {
            return false;
        }
        // Check if none property is set
        if (!!rule.groups.none && !ArrayValidators_1.arrayContainsNone(context.groups, rule.groups.none)) {
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
