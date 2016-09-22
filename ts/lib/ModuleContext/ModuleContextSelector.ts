import IModuleContext from './IModuleContext';
import IModuleContextSelector from './IModuleContextSelector';

class ModuleContextSelectorClass implements IModuleContextSelector {
    rules: IModuleContext[];

    constructor() {
        this.rules = new Array<IModuleContext>();
    }
    
}

var ModuleContextSelector = new ModuleContextSelectorClass();
export default ModuleContextSelector;