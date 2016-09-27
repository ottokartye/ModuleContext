"use strict";
const chai_1 = require('chai');
const ModuleContextSelector_1 = require('../lib/ModuleContextSelector');
const Context_1 = require('../lib/Context');
describe('ModuleContext', () => {
    const moduleContext = {
        main: 'male',
        groups: {
            one: ['young', 'parent', 'rich']
        },
        module: ['sampleModuleName']
    };
    const context = new Context_1.default();
    context.setMain('male');
    context.addGroup('young').addGroup('parent');
    it('should contain group items', () => {
        chai_1.expect(context.groups).to.have.length(2);
    });
    it('should validate context.main', () => {
        const mainValidatorResult = ModuleContextSelector_1.mainValidator(moduleContext, context);
        chai_1.expect(mainValidatorResult).to.be.true;
    });
    it('should pass arrayContainsOne validation', () => {
        const arrayContainsOneResult = ModuleContextSelector_1.arrayContainsOne(context.groups, moduleContext.groups.one);
        chai_1.expect(arrayContainsOneResult).to.be.true;
    });
});
