"use strict";
const Context_1 = require('./Context');
class ContextFactory {
    getContext(object) {
        let context = new Context_1.default;
        this.rules.forEach((rule) => {
            rule.exec(context);
        });
        return context;
    }
    addRule(rule) {
        if (!this.rules) {
            this.rules = new Array();
        }
        this.rules.push(rule);
    }
}
var contextFactory = new ContextFactory;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = contextFactory;
