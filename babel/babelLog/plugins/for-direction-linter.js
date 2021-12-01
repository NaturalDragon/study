const { declare } = require('@babel/helper-plugin-utils')

const forDirectionLintPlugin = declare((api, options, dirname) => {
    api.assertVersion(7);
    return {
        pre(file) {
            file.set('errors', []);
        },
        visitor: {
            ForStatement(path) {
                console.log(path.node.test.operator)
                console.log(path.node.update.operator);
                const errors = state.file.get('errors');
                const testOperator = path.node.test.operator;
                const updateOperator = path.node.update.operator;
                let shouldUpdateOperator;
                if (["<", "<="].includes(testOperator)) {
                    shouldUpdateOperator = '++'
                }
                if (['>', '>='].includes(testOperator)) {
                    shouldUpdateOperator = '--'
                }

                if (shouldUpdateOperator !== updateOperator) {
                    const tmp = Error.stackTraceLimit;
                    Error.stackTraceLimit = 0;
                    errors.push(path.get('update').buildCodeFrameError("for direction error", Error));
                    Error.stackTraceLimit = tmp;
                }
            }
        },
        post(file) {
            console.log(file.get('errors'));
        }
    }
})