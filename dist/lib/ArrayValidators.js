"use strict";
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
