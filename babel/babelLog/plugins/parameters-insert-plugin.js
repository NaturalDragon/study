const targetCalleName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
module.exports = function ({ types, template }) {
    // /console.log(config)
    return {
        pre(file){
           // console.log(file)
            this.cache=new Map([[1,3]])
        },

        visitor: {
            CallExpression(path, state,) {
                if (path.node.isNew) {
                    return;
                }
                if (types.isMemberExpression(path.node.callee)
                    && path.node.callee.object.name === 'console'
                    && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name)) {
                    // const {line,column}=path.node.loc.start;
                    // path.node.arguments.unshift(types.stringLiteral(`filename :(${line},${column})`))
                    const { line, column } = path.node.loc.start;
                    const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
                    newNode.isNew = true;

                    if (path.findParent(path => path.isJSXElement())) {
                        path.replaceWith(types.arrayExpression([newNode, path.node]))
                        path.skip();
                    } else {
                        path.insertBefore(newNode);
                    }
                }
            }
        },
        post(file){
           // console.log(this.cache)
        }
    }
}