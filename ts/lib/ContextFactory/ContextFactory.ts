import IContextFactory from './IContextFactory';
import { IContext, IContextRule} from './IContext';
import Context from './Context';

class ContextFactory implements IContextFactory {
    rules: IContextRule[];

    getContext(object: any): IContext {
        let context = new Context;

        this.rules.forEach((rule) => {
            rule.exec(context);
        });

        return context;
    }

    addRule(rule: IContextRule) {
        if (!this.rules) {
            this.rules = new Array<IContextRule>();
        }
        this.rules.push(rule);
    }
}

var contextFactory: IContextFactory = new ContextFactory;
export default contextFactory;