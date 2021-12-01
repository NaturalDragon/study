const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default
const types = require('@babel/types')
const template = require('@babel/template').default
const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode, {

    sourceType: 'unambiguous',
    plugins: ['jsx']
})

console.log(ast)
const targetCalleName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

traverse(ast, {

    CallExpression(path, state) {
        console.log(path)
        // if(types.isMemberExpression(path.node.callee)
        // &&path.node.callee.object.name==='console'
        // &&['log','info','error','debug'].includes(path.node.callee.property.name)){
        //     const {line,column}=path.node.loc.start;
        //     path.node.arguments.unshift(types.stringLiteral(`filename :(${line},${column})`))
        // }
        if (path.node.isNew) {
            return;
        }
        const calleName = generate(path.node.callee).code;
        if (targetCalleName.includes(calleName)) {
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
    },

})

const { code, map } = generate(ast)

console.log(code)
