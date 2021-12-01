const { transformFromAstSync } = require('@babel/core')
const parser = require('@babel/parser')
const typeCheckPlugin = require('../plugins/type-check-plugin.js')

const sourceCode = `
var a:string;
a=11;
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['typescript']
})

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [typeCheckPlugin],
})

console.log(code)