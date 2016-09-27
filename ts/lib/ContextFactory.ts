import IContextFactory from './IContextFactory';
import { IContext, IContextRule} from './IContext';
import Context from './Context';

class ContextFactory implements IContextFactory {
    rules: IContextRule[];

    constructor() {
        this.rules = [] as IContextRule[];
    }

    getContext(object: any): IContext {
        let context = new Context;

        this.rules.forEach((rule) => {
            rule.exec(context);
        });

        return context;
    }

    addRule(rule: IContextRule): IContextFactory {
        this.rules.push(rule);
        return this;
    }
}

var contextFactory: IContextFactory = new ContextFactory;
export default contextFactory;