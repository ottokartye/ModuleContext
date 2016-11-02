import { expect } from 'chai';
import ModuleContextSelector from '../lib/ModuleContextSelector';
import { arrayContainsOne, arrayContainsAll, arrayContainsNone } from '../lib/ArrayValidators';
import IModuleContext from '../lib/IModuleContext';
import { IContext } from '../lib/IContext';
import Context from '../lib/Context';

describe('ModuleContext', () => {

    // Testing array validations
    describe('arrayContainsOne', () => {
        it('should contain one entry', () => {
            const groups = ['young','poor','president'];
            const arrayContainsOneResult = arrayContainsOne(groups, ['young']);
            expect(arrayContainsOneResult).to.be.true;
        });

        it('should not contain any entries', () => {
            const groups = ['young','poor','president'];
            const arrayContainsOneResult = arrayContainsOne(groups, ['old', 'rich', 'parent']);
            expect(arrayContainsOneResult).to.be.false;
        });
    });

    describe('arrayContainsAll', () => {
        it('should pass containing all entries', () => {
            const groups = ['young', 'parent', 'rich'];
            const arrayContainsOneResult = arrayContainsAll(groups, ['young','parent','rich']);
            expect(arrayContainsOneResult).to.be.true;
        });

        it('shoul not contain all entries', () => {
            const groups= ['young'];
            const arrayContainsOneResult = arrayContainsAll(groups, ['young','parent']);
            expect(arrayContainsOneResult).to.be.false;
        });
    });

    describe('arrayContainsNone', () => {
        it('should not contain any elements', () => {
            const groups = ['old', 'single', 'poor'];
            const arrayContainsOneResult = arrayContainsNone(groups, ['young','parent','rich']);
            expect(arrayContainsOneResult).to.be.true;
        });

        it('should contain a common element ', () => {
            const groups= ['young', 'single', 'poor'];
            const arrayContainsOneResult = arrayContainsNone(groups, ['young','parent']);
            expect(arrayContainsOneResult).to.be.false;
        });
    });

    // Sample context to check against ModuleContextSelector rules
    const context: IContext = new Context();
    context.setMain('male');
    context.addGroup('young').addGroup('parent').addGroup('rich');


    describe('adding rules to moduleContextSelector', () => {
        it('should add rules', () => {
            // Define new rules
            const male: IModuleContext = {
                main: 'male',
                groups: {
                    one: ['parent'],
                    all:['young','parent','rich'],
                    none: ['old']
                },
                module: ['SayHello']
            };
            const female: IModuleContext = {
                main: 'female',
                groups: {
                    one: ['parent'],
                    all:['young','parent','poor'],
                    none: ['old']
                },
                module: ['sampleModuleName']
            };
            ModuleContextSelector.addRule(male).addRule(female);
            const result = ModuleContextSelector.getNumberOfRules();
            expect(result).to.be.equal(2);
        });
    });

    describe('loading modules', () => {
        it('should find a rule which matches the currently passed context and load the required module', () => {
            const result = ModuleContextSelector.load(context);
            expect(result).to.be.true;
        })
    });
});