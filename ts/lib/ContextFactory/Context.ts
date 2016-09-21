import { IContext } from './IContext';

class Context implements IContext {
    private _main: string;
    public groups: string[];

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
        if (!this.groups) {
            this.groups = new Array<string>();
        }
        this.groups.push(groupId);
        return this;
    }
}

export default Context;