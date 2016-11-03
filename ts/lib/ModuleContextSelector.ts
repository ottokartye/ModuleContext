/// <reference path="../../typings/index.d.ts" />

import IModuleContext from './IModuleContext';
import {IContext} from './IContext';
import IModuleContextSelector from './IModuleContextSelector';
import { arrayContainsNone, arrayContainsOne, arrayContainsAll } from './ArrayValidators';

export module ModuleContextSelector {

    /**
     * Execute the provided context against the list of provided rules
     * @param {IModuleContext[]} rules
     * @param {IContext} context
     * @returns {Promise<IModuleContext>}
     */
    export function exec(rules: IModuleContext[], context: IContext): Promise<IModuleContext> {
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

    /**
     * Check if provided context validates against the list of rules
     * @param  {IModuleContext[]} rules
     * @param  {IContext} context
     * @returns IModuleContext
     */
    function findRule(rules: IModuleContext[], context: IContext): IModuleContext {

        return rules.find((rule) => {

            let mainValidatorResult: boolean = mainValidator(rule, context);
            let groupValidatorResult: boolean = groupValidator(rule, context);

            return mainValidatorResult && groupValidatorResult;
        });
    }

    /**
     * Load modules contained in IModuleContext if rules apply
     * @param  {IModuleContext[]} rules
     * @param  {IContext} context
     * @returns boolean
     */
    function load(rule: IModuleContext, context: IContext): boolean {

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
    function mainValidator (rule: IModuleContext, context: IContext): boolean {
        let mainValidator: boolean = true;

        if (!!rule.main) {
            if (rule.main instanceof Array) {
                mainValidator = rule.main.indexOf(context.main) > -1;
            } else {
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
    function groupValidator (rule: IModuleContext, context: IContext): boolean {

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

}