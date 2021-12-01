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
let a = babylon.parseExpression(sourceCode, {
  sourceType: 'module',
  plugins: ['jsx']
})
console.log(ast)
console.log('---------------------------------------------------')
console.log(a)


traverse(ast, {
  enter(path) {
    // if (path.node.type === 'Identifier' && path.node.name === 'n') {
    //   path.node.name = 'x'
    // }
    if (types.isIdentifier(path.node, {
      name: 'n'
    })) {
      path.node.name = 'a'
    }
  }
})

const { code } = generator(ast, {

})
// console.log(code)
const binaryExpression = types.binaryExpression('*', types.identifier('a'), types.identifier('b'));
console.log(binaryExpression)

const binaryExpressionJs = generator(binaryExpression)
// console.log(types.isBinaryExpression(binaryExpression, { operator: '*' }))
// console.log('---------------------------------------------------')
// console.log(binaryExpressionJs.code)
// console.log('---------------------------------------------------')
const buildReuire = template(`
          var IMPORT_NAME= require(SOURCE)
`)
const astBuild = buildReuire({
  IMPORT_NAME: types.identifier('myModule'),
  SOURCE: types.stringLiteral('my-module')
})

// console.log(astBuild)
// console.log(generator(astBuild, {}).code)