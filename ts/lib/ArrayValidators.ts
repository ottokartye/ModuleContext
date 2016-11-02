/**
 * Check if groups array contains at least one element from oneArray
 * @param  {string[]} groups
 * @param  {string[]} oneArray
 * @returns boolean
 */
export function arrayContainsOne(groups: string[], oneArray: string[]): boolean {
    let currentElement;
    
    currentElement = oneArray.find((value) => {
        return groups.indexOf(value) > -1;
    });

    return !!currentElement;
}

/**
 * Check if groups array contains all elements from allArray
 * @param  {string[]} groups
 * @param  {string[]} allArray
 * @returns boolean
 */
export function arrayContainsAll(groups: string[], allArray: string[]): boolean {    
    let currentElement = allArray.find((value) => {
        return groups.indexOf(value) === -1;
    });

    if (currentElement) {
        return false;
    }

    return true;
}

/**
 * Check if groups array does not contain any of the elements in noneArray
 * @param  {string[]} groups
 * @param  {string[]} noneArray
 * @returns boolean
 */
export function arrayContainsNone(groups: string[], noneArray: string[]): boolean {
    let currentElement = noneArray.find((value) => {
        return groups.indexOf(value) > -1;
    });

    if (currentElement) {
        return false;
    }

    return true;
}