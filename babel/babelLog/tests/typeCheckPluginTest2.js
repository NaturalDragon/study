const { transformFromAstSync } = require('@babel/core')
const parser = require('@babel/parser')
const typeCheckPlugin = require('../plugins/type-check-plugin2.js')

const sourceCode = `
function add(a: number, b: number): number{
    return a + b;
}
add(1, '2');
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['typescript']
})

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [typeCheckPlugin],
})

console.log(code)