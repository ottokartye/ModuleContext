export interface IContext {
    main: string;
    groups: string[];
}

export interface IContextRule {
    id: string;
    exec: (context: IContext) => void;
}