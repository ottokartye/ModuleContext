/// <reference path="../../typings/index.d.ts" />

import IModuleContext from './IModuleContext';
import {IContext} from './IContext';
import IModuleContextSelector from './IModuleContextSelector';
import { arrayContainsNone, arrayContainsOne, arrayContainsAll } from './ArrayValidators';

class ModuleContextSelector implements IModuleContextSelector {
    private rules: IModuleContext[];

    constructor() {
        this.rules = [];
    }

    /**
     * Add a new rule (piping supported)
     * @param  {IModuleContext} rule
     * @returns IModuleContextSelector
     */
    public addRule(rule: IModuleContext): IModuleContextSelector {
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
    public load(context: IContext): boolean {
        // Check if context matches any rule
        let selectedRule = this.findRule(this.rules, context);

        if (!selectedRule) {
            return false;
        }

        // TODO: loading only module from current directory, check needed for existence of a module
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
    private mainValidator (rule: IModuleContext, context: IContext): boolean {
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
    private groupValidator (rule: IModuleContext, context: IContext): boolean {

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

    /**
     * Check if provided context validates against the list of rules
     * @param  {IModuleContext[]} rules
     * @param  {IContext} context
     * @returns IModuleContext
     */
    private findRule(rules: IModuleContext[], context: IContext): IModuleContext {

        return rules.find((rule) => {

            let mainValidatorResult: boolean = this.mainValidator(rule, context);
            let groupValidatorResult: boolean = this.groupValidator(rule, context);

            return mainValidatorResult && groupValidatorResult;
        });
    }

    /**
     * Only for testing!
     * Return total number of rules
     * @returns number
     */
    public getNumberOfRules(): number {
        return this.rules.length;
    }
}

var moduleContextSelector = new ModuleContextSelector;
export default moduleContextSelector;