const { declare } = require('@babel/helper-plugin-utils')

const CodeCompressPlugin = declare((api, options, dirname) => {
    api.assertVersion(7);
    return {
        pre(file) {
            file.set('errors', [])
        },
        visitor: {
            BlockStatement(path, state) {
                let bodyPaths = path.get('body')
                let purge = false
                for (let i = 0; i < bodyPaths.length; i++) {
                    let currentPath = bodyPaths[i];
                    if (currentPath.isCompletionStatement()) {
                        purge = true
                        continue
                    }

                    if (purge && !(currentPath.isFunctionDeclaration() ||
                        currentPath.isVariableDeclaration({
                            kind: 'var'
                        }))) {
                        currentPath.remove()
                    }

                }
            },
            Scopable(path, state) {
                const bindings = path.scope.bindings;
                Object.entries(bindings).forEach(([key, binding]) => {
                    if (!binding.referenced) {
                        if (binding.path.get('init').isCallExpression()) {
                            const comments = binding.path.get('init').node.leadingComments
                            if (comments && comments[0]) {
                                if (comments[0].value.includes('PURE')) {
                                    binding.path.remove();
                                    return;
                                }
                            }
                        }
                        if (!path.scope.isPure(binding.path.node.init)) {

                            binding.path.parentPath.replaceWith(api.types.expressionStatement(binding.path.node.init))
                        } else {
                            binding.path.remove()
                        }
                    }
                });
            }
        },
        post(file) {
            console.log(file.get('errors'));
        }
    }
})

module.exports = CodeCompressPlugin