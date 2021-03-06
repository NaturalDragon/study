const { transformFromAstSync } = require('@babel/core')
const parser = require('@babel/parser')
const CodeManglePlugin = require('../plugins/code-mangle-plugin')

const sourceCode = `
function func() {
    const num1 = 1;
    const num2 = 2;
    const num3 = /*@__PURE__*/add(1, 2);
    const num4 = add(3, 4);
    console.log(num2);
    return num2;
    console.log(num1);
    function add (aaa, bbb) {
        return aaa + bbb;
    }
}
func();
`;

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: []
})

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [CodeManglePlugin],
})

console.log(code)