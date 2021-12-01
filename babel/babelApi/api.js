const babylon = require('babylon')
const traverse = require('@babel/traverse').default
const generator = require('babel-generator').default
const types = require('babel-types')
const template = require('babel-template')
const sourceCode = `function square(n) {
    return n * n;
  }`;

let ast = babylon.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx']
});

traverse(ast, {
    FunctionDeclaration(path, state) {

        // path.remove()
        // const id = path.scope.generateUidIdentifierBasedOnNode(path.node.id);
        // path.remove();
        // path.scope.parent.push({ id, init: path.node });
        console.log(state)
        path.scope.rename('n', 'x')
        path.scope.rename('x')
    },
    BinaryExpression(path) {
        // console.log(path.parentPath)

        // path.parentPath.replaceWith(
        //     types.expressionStatement(types.stringLiteral('kdk'))
        // )
        // path.parentPath.remove()
        // console.log(path.scope.hasBinding('n'))
        // console.log(path.scope.hasOwnBinding('n'))
        // path.scope.generateDeclaredUidIdentifier('uid')
        // path.scope.generateDeclaredUidIdentifier('uid')



    },
    CallExpression(path) {

    }
})
const { code } = generator(ast, {})
console.log(code)