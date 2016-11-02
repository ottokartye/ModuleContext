import { expect } from 'chai';
import { load, findRule, mainValidator, groupValidator } from '../lib/ModuleContextSelector';
import { arrayContainsOne, arrayContainsAll, arrayContainsNone } from '../lib/ArrayValidators';
import IModuleContext from '../lib/IModuleContext';
import { IContext } from '../lib/IContext';
import Context from '../lib/Context';

describe('ModuleContext', () => {

    const moduleContext: IModuleContext = {
        main: 'male',
        groups: {
            one: ['parent'],
            all:['young','parent','rich'],
            none: ['old']
        },
        module: ['sampleModuleName']
    };

    const context: IContext = new Context();
    context.setMain('male');
    context.addGroup('young').addGroup('parent').addGroup('rich');

    it('should contain group items', () => {
        expect(context.groups).to.have.length(3);
    });

    it('should validate context.main', () => {
        const mainValidatorResult = mainValidator(moduleContext, context);
        expect(mainValidatorResult).to.be.true;
    }); 

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

    describe('mainValidator', () => {
        it('should pass main property validation', () => {
            const result = mainValidator(moduleContext, context);
            expect(result).to.be.true;
        });
    });

    describe('groupValidator', () => {
        it('should pass group property validation', () => {
            const result = groupValidator(moduleContext, context);
            expect(result).to.be.true;
        });
    });

    describe('findRule', () => {
        it('should return a rule which is valid for the currently passed context', () => {
            const result = findRule([moduleContext], context);
            expect(result).to.be.eql({
                main: 'male',
                groups: {
                    one: ['parent'],
                    all:['young','parent','rich'],
                    none: ['old']
                },
                module: ['sampleModuleName']
            });
        })
    });
});