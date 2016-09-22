import IModuleContext from './IModuleContext';
import IModuleContextSelector from './IModuleContextSelector';

class ModuleContextSelectorClass implements IModuleContextSelector {
    rules: IModuleContext[];

    constructor() {
        this.rules = new Array<IModuleContext>();
    }

    addRule(rule: IModuleContext): IModuleContextSelector {
        this.rules.push(rule);
        return this;
    }
}

var ModuleContextSelector = new ModuleContextSelectorClass();
export default ModuleContextSelector;