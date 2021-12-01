const { declare } = require('@babel/helper-plugin-utils')
function resolveType(targetType) {
    switch (targetType.type) {
        case 'TSTypeAnnotation':
            return 'string';
        case 'NumberTypeAnnotation':
            return 'number';
    }
}
const TypeCheckPlugin = declare((api, options, dirname) => {
    api.assertVersion(7);
    return {
        pre(file) {
            file.set('errors', [])
        },
        visitor: {
            AssignmentExpression(path, state) {
                const errors = state.file.get('errors')
                const left = path.get('left');
                const right = path.get('right');
                const leftBinding = path.scope.getBinding(left.toString());
                const leftType = resolveType(leftBinding.path.get('id').getTypeAnnotation())
                const rightType = resolveType(right.getTypeAnnotation())
                if (leftType !== rightType) {
                    const tmp = Error.stackTraceLimit;
                    Error.stackTraceLimit = 0;
                    errors.push(right.buildCodeFrameError(`${rightType} can not assign to ${leftType}`, Error));
                    Error.stackTraceLimit = tmp;
                }
            }
        },
        post(file) {
            console.log(file.get('errors'));
        }
    }
})

module.exports = TypeCheckPlugin