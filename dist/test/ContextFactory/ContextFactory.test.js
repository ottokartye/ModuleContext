"use strict";
const chai_1 = require('chai');
const ContextFactory_1 = require('../../lib/ContextFactory/ContextFactory');
const Context_1 = require('../../lib/ContextFactory/Context');
describe('ContextFactory', () => {
    const youngMale = {
        id: 'youngMale',
        exec: (context) => {
            context.setMain('male');
            context.addGroup('young');
        }
    };
    const oldFather = {
        id: 'oldFather',
        exec: (context) => {
            context.setMain('father');
            context.addGroup('male').addGroup('old').addGroup('father');
        }
    };
    it('should add ContextRules to ContextFactory', () => {
        ContextFactory_1.default.addRule(youngMale);
        ContextFactory_1.default.addRule(oldFather);
        chai_1.expect(ContextFactory_1.default.rules).to.have.length(2);
    });
    it('should return the Context for User object', () => {
        const context = ContextFactory_1.default.getContext({});
        const testContext = new Context_1.default();
        testContext.setMain('male');
        testContext.addGroup('young').addGroup('male').addGroup('old').addGroup('father');
        chai_1.expect(context).to.be.eql(testContext);
    });
});
