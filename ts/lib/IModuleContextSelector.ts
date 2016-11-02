import IModuleContext from './IModuleContext';
import {IContext} from './IContext';

interface IModuleContextSelector {
    addRule: (rule: IModuleContext) => IModuleContextSelector;
    load: (context: IContext) => boolean;
}

export default IModuleContextSelector;