import IContextFactory from './IContextFactory';
import { IContext, IContextRule} from './IContext';

class Context implements IContext {
    main: string;
    groups: string[];
}

class ContextFactory implements IContextFactory {
    rules: IContextRule[] = new Array();

    getContext(object: any): IContext {
        let context = new Context;

        this.rules.forEach((rule) => {
            rule.exec(context);
        });

        return context;
    }

    addRule(rule: IContextRule) {
        this.rules.push(rule);
    }
}

var contextFactory: IContextFactory = new ContextFactory;
export default contextFactory;