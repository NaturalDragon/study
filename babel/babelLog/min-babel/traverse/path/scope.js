class Binding {
    constructor(id, path, scope, kind) {
        this.id = id;
        this.path = path;
        this.referenced = false;
        this.referencePaths = []
    }
}
class Scope {
    constructor(parentScope, path) {
        this.parent = parentScope;
        this.bindings = {}
        this.path = path;
    }
    registerBinding(id, path) {
        this.bindings[id] = new Binding(id, path)
    }
    getOwnBinding(id) {
        return this.bindings[id]
    }
    getBinding(id) {
        let res = this.getOwnBinding(id);
        if (!res && this.parent) {
            res = this.parent.getOwnBinding(id)
        }
        return res;
    }
    hasBinding(id) {
        return !!this.getBinding(id)
    }
}

module.exports = Scope