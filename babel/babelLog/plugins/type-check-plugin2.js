const { declare } = require('@babel/helper-plugin-utils')
function resolveType(targetType) {
    const tsTypeAnnotationMap = {
        TSStringKeyword: 'string',
        TSNumberKeyword: 'number'
    }
    switch (targetType.type) {
        case 'TSTypeAnnotation':
            return tsTypeAnnotationMap[targetType.typeAnnotation.type];
        case 'NumberTypeAnnotation':
            return 'number';
        case 'StringTypeAnnotation':
            return 'string';
    }
}
function noStackTraceWrapper(cb) {
    const tmp = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    cb && cb(Error);
    Error.stackTraceLimit = tmp;
}

const TypeCheckPlugin = declare((api, options, dirname) => {
    api.assertVersion(7);
    return {
        pre(file) {
            file.set('errors', [])
        },
        visitor: {
            CallExpression(path, state) {
                const errors = state.file.get('errors')
                const arguments = path.get('arguments');
                const argumentsTypes = arguments.map(item => {
                    return resolveType(item.getTypeAnnotation())
                })
                const callee = path.get('callee');
                const calleeBinding = path.scope.getBinding(callee.toString())
                const declareParamsTypes = calleeBinding.path.get('params').map(item => {
                    return resolveType(item.getTypeAnnotation())
                })
                argumentsTypes.forEach((item, index) => {
                    if (item !== declareParamsTypes[index]) {
                        noStackTraceWrapper(Error => {
                            errors.push(path.get('arguments.' + index).buildCodeFrameError(`${item} can not assign to ${declareParamsTypes[index]}`, Error));
                        });
                    }
                })
            }

        },
        post(file) {
            console.log(file.get('errors'));
        }
    }
})

module.exports = TypeCheckPlugin