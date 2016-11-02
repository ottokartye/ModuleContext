"use strict";
const chai_1 = require('chai');
const ModuleContextSelector_1 = require('../lib/ModuleContextSelector');
const ArrayValidators_1 = require('../lib/ArrayValidators');
const Context_1 = require('../lib/Context');
describe('ModuleContext', () => {
    // Testing array validations
    describe('arrayContainsOne', () => {
        it('should contain one entry', () => {
            const groups = ['young', 'poor', 'president'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsOne(groups, ['young']);
            chai_1.expect(arrayContainsOneResult).to.be.true;
        });
        it('should not contain any entries', () => {
            const groups = ['young', 'poor', 'president'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsOne(groups, ['old', 'rich', 'parent']);
            chai_1.expect(arrayContainsOneResult).to.be.false;
        });
    });
    describe('arrayContainsAll', () => {
        it('should pass containing all entries', () => {
            const groups = ['young', 'parent', 'rich'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsAll(groups, ['young', 'parent', 'rich']);
            chai_1.expect(arrayContainsOneResult).to.be.true;
        });
        it('shoul not contain all entries', () => {
            const groups = ['young'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsAll(groups, ['young', 'parent']);
            chai_1.expect(arrayContainsOneResult).to.be.false;
        });
    });
    describe('arrayContainsNone', () => {
        it('should not contain any elements', () => {
            const groups = ['old', 'single', 'poor'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsNone(groups, ['young', 'parent', 'rich']);
            chai_1.expect(arrayContainsOneResult).to.be.true;
        });
        it('should contain a common element ', () => {
            const groups = ['young', 'single', 'poor'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsNone(groups, ['young', 'parent']);
            chai_1.expect(arrayContainsOneResult).to.be.false;
        });
    });
    // Sample context to check against ModuleContextSelector rules
    const context = new Context_1.default();
    context.setMain('male');
    context.addGroup('young').addGroup('parent').addGroup('rich');
    describe('adding rules to moduleContextSelector', () => {
        it('should add rules', () => {
            // Define new rules
            const male = {
                main: 'male',
                groups: {
                    one: ['parent'],
                    all: ['young', 'parent', 'rich'],
                    none: ['old']
                },
                module: ['SayHello']
            };
            const female = {
                main: 'female',
                groups: {
                    one: ['parent'],
                    all: ['young', 'parent', 'poor'],
                    none: ['old']
                },
                module: ['sampleModuleName']
            };
            ModuleContextSelector_1.default.addRule(male).addRule(female);
            const result = ModuleContextSelector_1.default.getNumberOfRules();
            chai_1.expect(result).to.be.equal(2);
        });
    });
    describe('loading modules', () => {
        it('should find a rule which matches the currently passed context and load the required module', () => {
            const result = ModuleContextSelector_1.default.load(context);
            chai_1.expect(result).to.be.true;
        });
    });
});
