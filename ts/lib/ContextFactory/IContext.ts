export interface IContext {
    groups: string[];
    setMain: (id: string) => boolean;
    addGroup: (groupId: string) => IContext;
}

export interface IContextRule {
    id: string;
    exec: (context: IContext) => void;
}