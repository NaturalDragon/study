const babylon = require('babylon')
const traverse = require('babel-traverse').default
const generator = require('babel-generator').default
const types = require('babel-types')
const template = require('babel-template')
const sourceCode = `function square(n) {
    return n * n;
  }`;

const ast = babylon.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx']
})

traverse(ast, {
    enter(path) {
        if (types.isBinaryExpression(path.node)) {

            // console.log(path.node.l eft)

            console.log('enter')


            //   console.log(path)
            //   console.log('-------------------')
        }
        // let parentNode= path.findParent((path) => path.isObjectExpression());//path.findParent((path)=>path.isObjectExpression())
        // console.log(parentNode)
    },
    exit(path) {

    },
    BinaryExpression(path) {
        console.log('BinaryExpression')
        if (path.node.operator === '*') {
            // path.replaceWith(
            //     types.binaryExpression("**", path.node.left, types.numericLiteral(2))
            // );
            path.replaceWith(types.binaryExpression('**', path.node.left, path.node.right))
        }
        // path.get('left').isIdentifier({name:'x'})
        // types.isIdentifier(path.node.left,{name:'x'})

        ///  console.log(path.get('left'))
    },
    Program(path) {
        console.log('program')

        //console.log(path)
    },
    Identifier(path) {
        // console.log(path.node.name, path.isReferencedIdentifier())
        // console.log(path.node.name, types.isReferenced(path.node, path.parent))
    },
    VariableDeclaration(path) {

    },
   
    Function(path) {

        //console.log(path.inList)
        //  console.log(path.getSibling(0))
        // console.log(path.key)
        // console.log(path.listKey)
        // console.log(path.container)
    },
    // ReturnStatement(path) {
    //     path.replaceWithMultiple([
    //         types.expressionStatement(types.stringLiteral("Is this the real life?")),
    //         types.expressionStatement(types.stringLiteral("Is this just fantasy?")),
    //         types.expressionStatement(types.stringLiteral("(Enjoy singing the rest of the song in your head)")),
    //     ]);
    //   }
    FunctionDeclaration(path) {
        //  path.replaceWithSourceString(function add(){return a+b})
        path.insertBefore(types.expressionStatement(types.stringLiteral('ddd')))
        path.insertAfter(types.expressionStatement(types.stringLiteral('bb')))

        path.get('body').unshiftContainer('body', types.expressionStatement(types.stringLiteral('before')));
        path.get('body').pushContainer('body', types.expressionStatement(types.stringLiteral('after')))
    }
})

const { code } = generator(ast)
console.log(code)