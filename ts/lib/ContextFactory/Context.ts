import { IContext } from './IContext';

class Context implements IContext {
    private _main: string;
    public groups: string[];

    constructor() {
        this.groups = new Array<string>();
    }

    public setMain(id: string): boolean {
        if (!this.main) {
            this._main = id;
            return true;
        }
        return false;
    }

    public get main(): string {
        return this._main;
    }

    public addGroup(groupId: string): Context {
        this.groups.push(groupId);
        return this;
    }
}

export default Context;