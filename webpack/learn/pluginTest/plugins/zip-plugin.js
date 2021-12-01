const {RawSource} = require('webpack-sources');
const path=require('path')
const JSZIP=require('jszip')
const zip=new JSZIP()
module.exports=class ZipPlugin{
    constructor(options){
        this.options=options
    }
    apply(complier){
        complier.hooks.emit.tapAsync('ZipPlugin',(compilation,callback)=>{
            const folder = zip.folder(this.options.filename);
            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source();
                folder.file(filename, source);
            }
            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content) => {
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.filename + '.zip'
                );
                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                );
                compilation.assets[outputRelativePath] = new RawSource(content);
                callback();
            })
        })

        
    }
}