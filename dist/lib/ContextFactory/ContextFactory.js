"use strict";
class Context {
}
class ContextFactory {
    constructor() {
        this.rules = new Array();
    }
    getContext(object) {
        let context = new Context;
        this.rules.forEach((rule) => {
            rule.exec(context);
        });
        return context;
    }
    addRule(rule) {
        this.rules.push(rule);
    }
}
var contextFactory = new ContextFactory;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = contextFactory;
