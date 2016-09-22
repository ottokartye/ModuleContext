import IModuleContext from './IModuleContext';

interface IModuleContextSelector {
    rules: IModuleContext[];
    addRule: (rule: IModuleContext) => IModuleContextSelector;
}

export default IModuleContextSelector;