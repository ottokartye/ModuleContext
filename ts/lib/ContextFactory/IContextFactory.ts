import { IContext, IContextRule} from './IContext';

interface IContextFactory {
    rules: IContextRule[];
    getContext: (object: any) => IContext;

    addRule: (rule: IContextRule) => IContextFactory;
}

export default IContextFactory;