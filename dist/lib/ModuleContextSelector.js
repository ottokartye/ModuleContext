/// <reference path="../../typings/index.d.ts" />
"use strict";
const ArrayValidators_1 = require('./ArrayValidators');
class ModuleContextSelector {
    constructor() {
        this.rules = [];
    }
    /**
     * Add a new rule (piping supported)
     * @param  {IModuleContext} rule
     * @returns IModuleContextSelector
     */
    addRule(rule) {
        if (rule) {
            this.rules.push(rule);
        }
        return this;
    }
    /**
     * Load modules contained in IModuleContext if rules apply
     * @param  {IModuleContext[]} rules
     * @param  {IContext} context
     * @returns boolean
     */
    load(context) {
        // Check if context matches any rule
        let selectedRule = this.findRule(this.rules, context);
        if (!selectedRule) {
            return false;
        }
        let modules = require('./' + selectedRule.module);
        if (!!selectedRule.onLoadedModule) {
            selectedRule.onLoadedModule.apply(selectedRule, modules);
        }
        return true;
    }
    /**
     * Check if main criteria matches against provided IModuleContext
     * @param  {IModuleContext} rule
     * @param  {IContext} context
     * @returns boolean
     */
    mainValidator(rule, context) {
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
    groupValidator(rule, context) {
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
    /**
     * Check if provided context validates against the list of rules
     * @param  {IModuleContext[]} rules
     * @param  {IContext} context
     * @returns IModuleContext
     */
    findRule(rules, context) {
        return rules.find((rule) => {
            let mainValidatorResult = this.mainValidator(rule, context);
            let groupValidatorResult = this.groupValidator(rule, context);
            return mainValidatorResult && groupValidatorResult;
        });
    }
    /**
     * Only for testing!
     * Return total number of rules
     * @returns number
     */
    getNumberOfRules() {
        return this.rules.length;
    }
}
var moduleContextSelector = new ModuleContextSelector;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = moduleContextSelector;
