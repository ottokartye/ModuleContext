import { IContext, IContextRule} from './IContext';

interface IContextFactory {
    /**
     * Contains the rules of the generated Context
     * 
     * @type {IContextRule[]}
     * @memberOf IContextFactory
     */
    rules: IContextRule[];

    /**
     * Generate the new context and return it
     * 
     * @memberOf IContextFactory
     */
    getContext: (object: any) => IContext;

    /**
     * Add new ContextRule to the context
     * 
     * @memberOf IContextFactory
     */
    addRule: (rule: IContextRule) => IContextFactory;
}

export default IContextFactory;