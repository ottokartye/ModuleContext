/// <reference path="../../typings/index.d.ts" />

import IModuleContext from './IModuleContext';
import {IContext} from './IContext';
import IModuleContextSelector from './IModuleContextSelector';
import { arrayContainsNone, arrayContainsOne, arrayContainsAll } from './ArrayValidators';

export function mainValidator (rule: IModuleContext, context: IContext) {
    let mainValidator: boolean = true;

    if (!!rule.main) {
        if (rule.main instanceof Array) {
            mainValidator = rule.main.indexOf(context.main) > -1;
        } else {
            mainValidator = rule.main === context.main;
        }
    }

    return mainValidator;
};

export function groupValidator (rule: IModuleContext, context: IContext) {

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
};

/**
 * Load modules contained in IModuleContext if rules apply
 * @param  {IModuleContext[]} rules
 * @param  {IContext} context
 */
export function load(rules:IModuleContext[], context: IContext) {
    // Check if context matches any rule
    let selectedRule = findRule(rules, context);

    if (!selectedRule) {
        return;
    }

    let modules = require(selectedRule.module);

    if (!!selectedRule.onLoadedModule) {
        selectedRule.onLoadedModule.apply(selectedRule, modules);
    }
};

export function findRule(rules: IModuleContext[], context: IContext) {

    return rules.find((rule) => {

        let mainValidatorResult: boolean = mainValidator(rule, context);
        let groupValidatorResult: boolean = groupValidator(rule, context);

        return mainValidatorResult && groupValidatorResult;
    });
}