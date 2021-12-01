const types = require('../../types/index')
module.exports = class NodePath {
    constructor(node, parent, parentPath, key, listKey) {
        this.node = node;
        this.parent = parent;;
        this.parentPath = parentPath;
        this.key = key;
        this.listKey = listKey
        Object.keys(types).forEach(key => {
            if (key.startsWith('is')) {
                if (key.startsWith('is')) {
                    this[key] = types[key].bind(this, node)
                }
            }
        })
    }
    skip() {
        this.node.__sholdSkip = true
    }
    replaceWith(node) {
        if (this.listKey != undefined) {
            this.parent[this.key].splice(this.listKey, 1, node)
        } else {
            this.parent[this.key] = node
        }
    }
    remove() {
        if (this.listKey != undefined) {
            this.parent[this.key].splice(this.listKey, 1)
        } else {
            this.parent[this.key] = null
        }
    }
    findParent(callback) {
        let curPath = this.parentPath;
        while (curPath && !callback(curPath)) {
            curPath = curPath.parentPath
        }
        return curPath
    }
    find(callback) {
        let curPath = this;
        while (curPath && !callback(curPath)) {
            curPath = curPath.parentPath
        }
        return curPath;
    }
    traverse(visitors) {
        const traverse = require('../index')
        const defination = types.visitorKeys.get(this.node.type)
        if (defination.visitor) {
            defination.visitor.forEach(key => {
                const prop = this.node[key];
                if (Array.isArray(prop)) {
                    prop.forEach((childNode, index) => {
                        traverse(childNode, visitors, this.node, this)
                    })
                } else {
                    traverse(childNode, visitors, this.node, this)
                }
            })
        }
    }
}
