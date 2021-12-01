const babylon = require('babylon')
const traverse = require('babel-traverse').default
const generator = require('babel-generator').default
const types = require('babel-types')
const template = require('babel-template')
const sourceCode = `
var scopeCode='abc'
function square(n) {
    console.log(scopeCode)
    return n * n;
  }`;

var ast=babylon.parse(sourceCode,{
    sourceType:'module',
    plugins:['jsx']
})

traverse(ast,{
    FunctionDeclaration(path){
        console.log(path.scope.block)
    },

})