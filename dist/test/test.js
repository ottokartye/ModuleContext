"use strict";
const ContextFactory_1 = require('../lib/ContextFactory/ContextFactory');
const chai_1 = require('chai');
describe('ContextFactory', () => {
    const youngMale = {
        id: 'youngMale',
        exec: (context) => {
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
    const oldFather = {
        id: 'oldFather',
        exec: (context) => {
            if (context.main === undefined) {
                context.main = 'parent';
            }
            if (context.groups === undefined) {
                context.groups = new Array();
            }
            context.groups.push('male', 'old', 'father');
        }
    };
    it('should add ContextRule to ContextFactory', () => {
        ContextFactory_1.default.addRule(youngMale);
        ContextFactory_1.default.addRule(oldFather);
        chai_1.expect(ContextFactory_1.default.rules).to.have.length(2);
    });
    it('should return the Context for User object', () => {
        const context = ContextFactory_1.default.getContext({});
        const testContext = {
            main: 'male',
            groups: ['young', 'male', 'old', 'father']
        };
        chai_1.expect(context).to.be.eql(testContext);
    });
});
