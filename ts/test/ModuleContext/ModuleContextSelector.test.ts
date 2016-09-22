import { expect } from 'chai';
import ModuleContextSelector from '../../lib/ModuleContext/ModuleContextSelector';
import IModuleContext from '../../lib/ModuleContext/IModuleContext';
import ModuleContext from '../../lib/ModuleContext/ModuleContext';

describe('ModuleContextSelector', () => {

    const youngFather: IModuleContext = {
        main: 'father',
        groups: {
            all: ['father', 'young', 'male']
        },
        module: [''],
        onLoadedModule(modules: string[]) {}
    };

    const student: IModuleContext = {
        main: 'male',
        groups: {
            all: ['young', 'jobseeker']
        },
        module: [''],
        onLoadedModule(modules: string[]) {}
    };

    it('should add a ModuleContext rule to ModuleContextSelector', () => {
        ModuleContextSelector.addRule(youngFather).addRule(student);
        expect(ModuleContextSelector.rules).to.have.length(2);
    });

});