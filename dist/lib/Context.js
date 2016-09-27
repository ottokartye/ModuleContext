"use strict";
class Context {
    constructor() {
        this.groups = [];
    }
    setMain(id) {
        if (!this.main) {
            this._main = id;
            return true;
        }
        return false;
    }
    get main() {
        return this._main;
    }
    addGroup(groupId) {
        console.log('adding ' + groupId);
        this.groups.push(groupId);
        return this;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Context;
