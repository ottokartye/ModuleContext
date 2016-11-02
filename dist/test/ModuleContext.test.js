"use strict";
const chai_1 = require('chai');
const ModuleContextSelector_1 = require('../lib/ModuleContextSelector');
const ArrayValidators_1 = require('../lib/ArrayValidators');
const Context_1 = require('../lib/Context');
describe('ModuleContext', () => {
    const moduleContext = {
        main: 'male',
        groups: {
            one: ['parent'],
            all: ['young', 'parent', 'rich'],
            none: ['old']
        },
        module: ['sampleModuleName']
    };
    const context = new Context_1.default();
    context.setMain('male');
    context.addGroup('young').addGroup('parent').addGroup('rich');
    it('should contain group items', () => {
        chai_1.expect(context.groups).to.have.length(3);
    });
    it('should validate context.main', () => {
        const mainValidatorResult = ModuleContextSelector_1.mainValidator(moduleContext, context);
        chai_1.expect(mainValidatorResult).to.be.true;
    });
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
    describe('mainValidator', () => {
        it('should pass main property validation', () => {
            const result = ModuleContextSelector_1.mainValidator(moduleContext, context);
            chai_1.expect(result).to.be.true;
        });
    });
    describe('groupValidator', () => {
        it('should pass group property validation', () => {
            const result = ModuleContextSelector_1.groupValidator(moduleContext, context);
            chai_1.expect(result).to.be.true;
        });
    });
    describe('findRule', () => {
        it('should return a rule which is valid for the currently passed context', () => {
            const result = ModuleContextSelector_1.findRule([moduleContext], context);
            chai_1.expect(result).to.be.eql({
                main: 'male',
                groups: {
                    one: ['parent'],
                    all: ['young', 'parent', 'rich'],
                    none: ['old']
                },
                module: ['sampleModuleName']
            });
        });
    });
});
