"use strict";
const chai_1 = require('chai');
const ModuleContextSelector_1 = require('../../lib/ModuleContext/ModuleContextSelector');
describe('ModuleContextSelector', () => {
    const youngFather = {
        main: 'father',
        groups: {
            all: ['father', 'young', 'male']
        },
        module: [''],
        onLoadedModule(modules) { }
    };
    const student = {
        main: 'male',
        groups: {
            all: ['young', 'jobseeker']
        },
        module: [''],
        onLoadedModule(modules) { }
    };
    it('should add a ModuleContext rule to ModuleContextSelector', () => {
        ModuleContextSelector_1.default.addRule(youngFather).addRule(student);
        chai_1.expect(ModuleContextSelector_1.default.rules).to.have.length(2);
    });
});
