/// <reference path="../../typings/index.d.ts" />
"use strict";
const ArrayValidators_1 = require('./ArrayValidators');
var ModuleContextSelector;
(function (ModuleContextSelector) {
    /**
     * Execute the provided context against the list of provided rules
     * @param {IModuleContext[]} rules
     * @param {IContext} context
     * @returns {Promise<IModuleContext>}
     */
    function exec(rules, context) {
        // Check if context matches any rule
        let selectedRule = findRule(rules, context);
        if (!selectedRule) {
            return;
        }
        // Load the module specified by the found rule (ModuleContext)
        if (selectedRule.module) {
            load(selectedRule, context);
        }
        return Promise.resolve(selectedRule);
    }
    ModuleContextSelector.exec = exec;
    /**
     * Check if provided context validates against the list of rules
     * @param  {IModuleContext[]} rules
     * @param  {IContext} context
     * @returns IModuleContext
     */
    function findRule(rules, context) {
        return rules.find((rule) => {
            let mainValidatorResult = mainValidator(rule, context);
            let groupValidatorResult = groupValidator(rule, context);
            return mainValidatorResult && groupValidatorResult;
        });
    }
    /**
     * Load modules contained in IModuleContext if rules apply
     * @param  {IModuleContext[]} rules
     * @param  {IContext} context
     * @returns boolean
     */
    function load(rule, context) {
        // TODO: loading only module from current directory, check needed for existence of a module
        let modules = require('./' + rule.module);
        if (!!rule.onLoadedModule) {
            rule.onLoadedModule.apply(rule, modules);
        }
        return true;
    }
    /**
     * Check if main criteria matches against provided IModuleContext
     * @param  {IModuleContext} rule
     * @param  {IContext} context
     * @returns boolean
     */
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
    /**
     * Check if group criteria matches against provided IModuleContext
     * @param  {IModuleContext} rule
     * @param  {IContext} context
     * @returns boolean
     */
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
})(ModuleContextSelector = exports.ModuleContextSelector || (exports.ModuleContextSelector = {}));
