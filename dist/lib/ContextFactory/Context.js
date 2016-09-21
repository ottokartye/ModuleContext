"use strict";
class Context {
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
        if (!this.groups) {
            this.groups = new Array();
        }
        this.groups.push(groupId);
        return this;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Context;
