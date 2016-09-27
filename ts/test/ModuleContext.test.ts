import { expect } from 'chai';
import { load, findRule, mainValidator, groupValidator, arrayContainsOne, arrayContainsAll, arrayContainsNone } from '../lib/ModuleContextSelector';
import IModuleContext from '../lib/IModuleContext';
import { IContext } from '../lib/IContext';
import Context from '../lib/Context';

describe('ModuleContext', () => {

    const moduleContext: IModuleContext = {
        main: 'male',
        groups: {
            one: ['young','parent','rich']
        },
        module: ['sampleModuleName']
    };

    const context: IContext = new Context();
    context.setMain('male');
    context.addGroup('young').addGroup('parent');

    it('should contain group items', () => {
        expect(context.groups).to.have.length(2);
    });

    it('should validate context.main', () => {
        const mainValidatorResult = mainValidator(moduleContext, context);
        expect(mainValidatorResult).to.be.true;
    }); 

    it('should pass arrayContainsOne validation', () => {
        const arrayContainsOneResult = arrayContainsOne(context.groups, moduleContext.groups.one);
        expect(arrayContainsOneResult).to.be.true;
    });
});