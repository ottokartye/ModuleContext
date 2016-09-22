"use strict";
class ModuleContextSelectorClass {
    constructor() {
        this.rules = new Array();
    }
    addRule(rule) {
        this.rules.push(rule);
        return this;
    }
}
var ModuleContextSelector = new ModuleContextSelectorClass();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ModuleContextSelector;
