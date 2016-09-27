export interface IContext {
    groups: string[];
    setMain: (id: string) => boolean;
    main: string;
    addGroup: (groupId: string) => IContext;
}

export interface IContextRule {
    id: string;
    exec: (context: IContext) => void;
}