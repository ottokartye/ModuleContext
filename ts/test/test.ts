import ContextFactory from '../lib/ContextFactory/ContextFactory';
import IContextFactory from '../lib/ContextFactory/IContextFactory';
import {IContext,IContextRule} from '../lib/ContextFactory/IContext';
import { expect } from 'chai';

describe('ContextFactory', () => {

    const youngMale: IContextRule = {
        id: 'youngMale',
        exec: (context: IContext) => {
            if (context.main === undefined) {
                context.main = 'male';
            }
            if (context.groups === undefined) {
                context.groups = new Array();
            }
            context.groups.push('young');
            return true;
        }
    };

    const oldFather: IContextRule = {
        id: 'oldFather',
        exec: (context: IContext) => {
            if (context.main === undefined) {
                context.main = 'parent';
            }
            if (context.groups === undefined) {
                context.groups = new Array();
            }
            context.groups.push('male', 'old', 'father');
        }
    }

    it('should add ContextRule to ContextFactory', () => {
        ContextFactory.addRule(youngMale);
        ContextFactory.addRule(oldFather);
        expect(ContextFactory.rules).to.have.length(2);
    });

    it('should return the Context for User object', () => {
        const context = ContextFactory.getContext({});
        const testContext: IContext = {
            main: 'male',
            groups: ['young', 'male', 'old', 'father']
        };
        expect(context).to.be.eql(testContext);
    });

});