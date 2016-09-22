import IModuleContext from './IModuleContext';
import IGroup from './IGroup';

class ModuleContext implements IModuleContext {
    main: string | string[];
    groups: IGroup;
    module: string[];

    onLoadedModule: (modules: string[]) => {}
}

export default ModuleContext;