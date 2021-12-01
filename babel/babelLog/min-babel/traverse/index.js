const { visitorKeys } = require('../types/index')
const NodePath = require('./path/nodePath')
module.exports = function traverse(node, visitors, parent, parentPath, key, listKey) {
    const defination = visitorKeys.get(node.type);
    let visitorFuncs = visitors[node.type] || {}
    if (typeof visitorFuncs === 'function') {
        visitorFuncs = {
            enter: visitorFuncs
        }
    }
    const path = new NodePath(node, parent, parentPath, key, listKey)
    visitorFuncs.enter && visitorFuncs.enter(path)
    if (node.__shouldSkip) {
        delete node.__shouldSkip
        return
    }
    if (defination.visitor) {
        defination.visitor.forEach(key => {
            const prop = node[key]
            if (Array.isArray(prop)) {
                prop.forEach((childNode, index) => {
                    traverse(childNode, visitors, node, path, key, index)
                })
            } else {
                traverse(prop, visitors, node, path, key)
            }
        })
    }
    visitorFuncs.exit && visitorFuncs.exit(path)
}
