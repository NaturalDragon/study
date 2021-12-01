const parser=require('@babel/parser');
const traverse=require('@babel/traverse').default;
const generate=require('@babel/generator').default
const types=require('@babel/types')
const template=require('@babel/template').default
const fs=require('fs')
const path=require('path')
const doctrine=require('doctrine')

const sourceCode = fs.readFileSync(path.join(__dirname, './src/apiDocSouceCode.js'), {
    encoding: 'utf-8'
});

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins:['typescript','jsx']
});

function resolveType(tsType) {
    const typeAnnotation = tsType.typeAnnotation;
    if (!typeAnnotation) {
        return;
    }
    switch (typeAnnotation.type) {
        case 'TSStringKeyword': 
            return 'string';
        case 'TSNumberKeyword':
            return 'number';
        case 'TSBooleanKeyword':
            return 'boolean';
    }
}
function parseComment(commentStr) {
    if (!commentStr) {
        return;
    }
    return doctrine.parse(commentStr, {
        unwrap: true
    });
}
function parseDoc(docs){
    let str = '';

    docs.forEach(doc => {
        if (doc.type === 'function') {
            str += '##' + doc.name + '\n';
            str += doc.doc.description + '\n';
            if (doc.doc.tags) {
                doc.doc.tags.forEach(tag => {
                    str += tag.name + ': ' + tag.description + '\n'; 
                })
            }
            str += '>' + doc.name + '(';
            if (doc.params) {
                str += doc.params.map(param => {
                    return param.name + ': ' + param.type;
                }).join(', ');
            }
            str += ')\n';
            str += '#### Parameters:\n';
            if (doc.params) {
                str += doc.params.map(param => {
                    return '-' + param.name + '(' + param.type + ')';
                }).join('\n');
            }
            str += '\n'
        } else if (doc.type === 'class'){
            str += '##' + doc.name + '\n';
            str += doc.doc.description + '\n';
            if (doc.doc.tags) {
                doc.doc.tags.forEach(tag => {
                    str += tag.name + ': ' + tag.description + '\n'; 
                })
            }
            str += '> new ' + doc.name + '(';
            if (doc.params) {
                str += doc.params.map(param => {
                    return param.name + ': ' + param.type;
                }).join(', ');
            }
            str += ')\n';
            str += '#### Properties:\n';
            if (doc.propertiesInfo) {
                doc.propertiesInfo.forEach(param => {
                    str += '-' + param.name + ':' + param.type + '\n';
                });
            }
            str += '#### Methods:\n';
            if (doc.methodsInfo) {
                doc.methodsInfo.forEach(param => {
                    str += '-' + param.name + '\n';
                });
            }
            str += '\n'
        }
        str += '\n'
    })
    return str;
}
traverse(ast,{
        
        FunctionDeclaration(path,state){
            const doc= []
            doc.push({
                type:'function',
                name:path.get('id').toString(),
                params:path.get('params').map(paramPath=>{
                    return {
                        name:paramPath.toString(),
                        type:resolveType(paramPath.getTypeAnnotation())
                    }
                })  ,
                doc:path.node.leadingComments&&parseComment(path.node.leadingComments[0].value)
            })
            console.log(JSON.stringify(doc))
            console.log( parseDoc(doc))
        },
        ClassDeclaration(path,state){
            // console.log(path.get('id').toString())
            // console.log(path.node.leadingComments)
        },

})