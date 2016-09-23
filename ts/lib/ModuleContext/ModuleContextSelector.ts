/// <reference path="../../../typings/index.d.ts" />

import IModuleContext from './IModuleContext';
import {IContext} from '../ContextFactory/IContext';
import IModuleContextSelector from './IModuleContextSelector';

/**
 * Load modules contained in IModuleContext if rules apply
 * @param  {IModuleContext[]} rules
 * @param  {IContext} context
 */
export function load(rules:IModuleContext[], context: IContext) {
    let selectedRule = rules.find((rule) => {

        let mainValidator: boolean = true,
            groupValidator: boolean = true;

        if (!!rule.main) {
            if (rule.main instanceof Array) {
                mainValidator = rule.main.indexOf(context.main) > -1;
            } else {
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

    if (!selectedRule) {
        return;
    }

    let modules = require(selectedRule.module);

    if (!!selectedRule.onLoadedModule) {
        selectedRule.onLoadedModule.apply(selectedRule, modules);
    }
};

/**
 * Check if groups array contains at least one element from oneArray
 * @param  {string[]} groups
 * @param  {string[]} oneArray
 * @returns boolean
 */
function arrayContainsOne(groups: string[], oneArray: string[]): boolean {
    let currentElement = oneArray.find((value) => {
        return (value in groups);
    });

    return !!currentElement;
}

/**
 * Check if groups array contains all elements from allArray
 * @param  {string[]} groups
 * @param  {string[]} allArray
 * @returns boolean
 */
function arrayContainsAll(groups: string[], allArray: string[]): boolean {    
    let currentElement = allArray.find((value) => {
        return !(value in groups);
    });

    return !currentElement;
}

/**
 * Check if groups array does not contain any of the elements in noneArray
 * @param  {string[]} groups
 * @param  {string[]} noneArray
 * @returns boolean
 */
function arrayContainsNone(groups: string[], noneArray: string[]): boolean {
    let currentElement = noneArray.find((value) => {
        return (value in groups);
    });

    return !currentElement;
}

function arrayContainsAll_cached(groups: string[], allArray: string[]) {
    let biggestArray;
    let smallestArray;
    if (groups.length < allArray.length) {
        biggestArray = allArray;
        smallestArray = groups;
    } else {
        biggestArray = groups;
        smallestArray = allArray;
    }

    let hashCache = {};
    biggestArray.forEach((value) => {
        hashCache[value] = true;
    });

    let hasFind = smallestArray.find((value) => {
        return !(value in hashCache)
    });

    return !hasFind;
}

function arrayContainsNone_cached(groups: string[], allArray: string[]) {
    let biggestArray;
    let smallestArray;
    if (groups.length < allArray.length) {
        biggestArray = allArray;
        smallestArray = groups;
    } else {
        biggestArray = groups;
        smallestArray = allArray;
    }

    let hashCache = {};
    biggestArray.forEach((value) => {
        hashCache[value] = true;
    });

    let hasFind = smallestArray.find((value) => {
        return !(value in hashCache)
    });

    return !hasFind;
}