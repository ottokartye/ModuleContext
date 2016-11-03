export interface IContext {
    /**
     * Array of string containing multiple criterias
     * 
     * @type {string[]}
     * @memberOf IContext
     */
    groups: string[];

    /**
     * Sets the main criteria for the context.
     * If it is already set it will return false.
     * 
     * @memberOf IContext
     */
    setMain: (id: string) => boolean;

    /**
     * The main criteria of the context
     * 
     * @type {string}
     * @memberOf IContext
     */
    main: string;

    /**
     * Add a criteria to the group
     * 
     * @memberOf IContext
     */
    addGroup: (groupId: string) => IContext;
}

export interface IContextRule {
    /**
     * The id of the ContextRule as string
     * 
     * @type {string}
     * @memberOf IContextRule
     */
    id: string;

    /**
     * Execute the context against the rule
     * 
     * @memberOf IContextRule
     */
    exec: (context: IContext) => void;
}