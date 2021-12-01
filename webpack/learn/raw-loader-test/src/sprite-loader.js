const Spritesmith=require('spritesmith')
const path=require('path')
const fs=require('fs')
module.exports=function(source){
    const callback=this.async()
    const imgs=source.match(/url\((\S*)\?__sprite/g)
    console.log(imgs)
    const matchImgs=[]
    for (let index = 0; index < imgs.length; index++) {
        const element = imgs[index];
        const img=element.match(/url\((\S*)\?__sprite/)[1]
        matchImgs.push(path.join(__dirname,img))
        
    }
    Spritesmith.run({
        src:matchImgs
    },(err,result)=>{
        fs.writeFileSync(path.join(process.cwd(),'dist/sprite.jpg'),result.image);
        source=source.replace(/url\((\S*)\?__sprite/g,(match)=>{
            return 'url(dist/sprite.jpg'
        })
        fs.writeFileSync(path.join(process.cwd(),'dist/index.css'),source)
        callback(null,source)
    })
    return source
}