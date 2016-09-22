"use strict";
const Context_1 = require('./Context');
class ContextFactory {
    constructor() {
        this.rules = new Array();
    }
    getContext(object) {
        let context = new Context_1.default;
        this.rules.forEach((rule) => {
            rule.exec(context);
        });
        return context;
    }
    addRule(rule) {
        this.rules.push(rule);
        return this;
    }
}
var contextFactory = new ContextFactory;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = contextFactory;
