import IGroup from './IGroup';

interface IModuleContext {
    main: string | string[];
    groups: IGroup;
    module: string[];
    onLoadedModule: (modules: string[]) => void;
}

export default IModuleContext;