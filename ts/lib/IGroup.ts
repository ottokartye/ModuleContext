interface IGroup {
    /**
     * If defined should match only one criteria contained inside this array
     * 
     * @type {string[]}
     * @memberOf IGroup
     */
    one?: string[];

    
    /**
     * If defined should match all criteria contained inside this array
     * 
     * @type {string[]}
     * @memberOf IGroup
     */
    all?: string[];

    
    /**
     * If defined should not contain any criteria contained inside this array
     * 
     * @type {string[]}
     * @memberOf IGroup
     */
    none?: string[];
}

export default IGroup;