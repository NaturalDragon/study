const parser = require('../parser/index')
const traverse = require('../traverse/index')
const ast = parser.parse('var a=1')
traverse(ast, {
    Identifier: {
        enter(path) {
            //  path.replaceWith(1)

            if (path.findParent(p => p.isCallExpression())) {
                path.replaceWith({ type: 'Identifier', name: 'bbbbbbb' });
            }
        }
    }

})