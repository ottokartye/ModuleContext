import { expect } from 'chai';
import ContextFactory from '../lib/ContextFactory';
import IContextFactory from '../lib/IContextFactory';
import {IContext,IContextRule} from '../lib/IContext';
import Context from '../lib/Context';

describe('ContextFactory', () => {

    const youngMale: IContextRule = {
        id: 'youngMale',
        exec: (context: Context) => {
            context.setMain('male');
            context.addGroup('young');
        }
    };

    const oldFather: IContextRule = {
        id: 'oldFather',
        exec: (context: Context) => {
            context.setMain('father');
            context.addGroup('male').addGroup('old').addGroup('father');
        }
    };

    it('should add ContextRules to ContextFactory', () => {
        ContextFactory.addRule(youngMale);
        ContextFactory.addRule(oldFather);
        expect(ContextFactory.rules).to.have.length(2);
    });

    it('should return the Context for User object', () => {
        const context = ContextFactory.getContext({});
        const testContext: IContext = new Context();
        testContext.setMain('male');
        testContext.addGroup('young').addGroup('male').addGroup('old').addGroup('father');

        expect(context).to.be.eql(testContext);
    });

});