import IGroup from './IGroup';

interface IModuleContext {
    
    /**
     * Main criteria of the rule
     * 
     * @type {(string | string[])}
     * @memberOf IModuleContext
     */
    main?: string | string[];

    /**
     * Group of criterias of the rule
     * 
     * @type {IGroup}
     * @memberOf IModuleContext
     */
    groups?: IGroup;

    /**
     * The module name that should be loaded
     * 
     * @type {string[]}
     * @memberOf IModuleContext
     */
    module: string[];

    /**
     * The callback function that should be executed when the module was loaded
     * 
     * @memberOf IModuleContext
     */
    onLoadedModule?: (modules: string[]) => void;
}

export default IModuleContext;