"use strict";
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const ModuleContextSelector_1 = require('../lib/ModuleContextSelector');
const ArrayValidators_1 = require('../lib/ArrayValidators');
const Context_1 = require('../lib/Context');
chai.use(chaiAsPromised);
const expect = chai.expect;
describe('Array validators', () => {
    // Testing array validations
    describe('arrayContainsOne', () => {
        it('should contain one entry', () => {
            const groups = ['young', 'poor', 'president'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsOne(groups, ['young']);
            expect(arrayContainsOneResult).to.be.true;
        });
        it('should not contain any entries', () => {
            const groups = ['young', 'poor', 'president'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsOne(groups, ['old', 'rich', 'parent']);
            expect(arrayContainsOneResult).to.be.false;
        });
    });
    describe('arrayContainsAll', () => {
        it('should pass containing all entries', () => {
            const groups = ['young', 'parent', 'rich'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsAll(groups, ['young', 'parent', 'rich']);
            expect(arrayContainsOneResult).to.be.true;
        });
        it('shoul not contain all entries', () => {
            const groups = ['young'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsAll(groups, ['young', 'parent']);
            expect(arrayContainsOneResult).to.be.false;
        });
    });
    describe('arrayContainsNone', () => {
        it('should not contain any elements', () => {
            const groups = ['old', 'single', 'poor'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsNone(groups, ['young', 'parent', 'rich']);
            expect(arrayContainsOneResult).to.be.true;
        });
        it('should contain a common element ', () => {
            const groups = ['young', 'single', 'poor'];
            const arrayContainsOneResult = ArrayValidators_1.arrayContainsNone(groups, ['young', 'parent']);
            expect(arrayContainsOneResult).to.be.false;
        });
    });
});
describe('ModuleContext', () => {
    // Sample context to check against ModuleContextSelector rules
    const context = new Context_1.default();
    context.setMain('male');
    context.addGroup('young').addGroup('parent').addGroup('rich');
    describe('loading modules', () => {
        it('should find a rule which matches the currently passed context and load the required module', () => {
            // Define new rules
            const rules = [{
                    main: 'male',
                    groups: {
                        one: ['parent'],
                        all: ['young', 'parent', 'rich'],
                        none: ['old']
                    },
                    module: ['SayHello']
                },
                {
                    main: 'female',
                    groups: {
                        one: ['parent'],
                        all: ['young', 'parent', 'poor'],
                        none: ['old']
                    },
                    module: ['sampleModuleName']
                }];
            const result = ModuleContextSelector_1.ModuleContextSelector.exec(rules, context);
            expect(result).to.eventually.be.eql({
                main: 'male',
                groups: {
                    one: ['parent'],
                    all: ['young', 'parent', 'rich'],
                    none: ['old'] },
                module: ['SayHello']
            });
        });
    });
});
