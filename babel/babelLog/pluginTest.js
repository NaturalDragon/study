const {transformFileSync,createConfigItem}=require('@babel/core');
const inesertParametersPlugin=require('./plugins/parameters-insert-plugin')
const templatePlugin=require('./plugins/template-plugin')
const templatePlugin2=require('./plugins/template-plugin2')
const path=require('path');

const {code}=transformFileSync(path.join(__dirname,'./sourceCode.js'),{
    plugins:[inesertParametersPlugin,templatePlugin,templatePlugin2],
    parserOpts:{
        sourceType:'unambiguous',
        plugins:['jsx']
    }
})
//  console.log(code)