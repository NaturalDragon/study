const { runLoaders } = require('loader-runner')
const fs = require('fs')
const path = require('path')
runLoaders({
    resource: path.join(__dirname, './src/demo.txt'),
    loaders: [
        {
            loader: path.join(__dirname, './src/raw-loader.js'),
            options: {
                name: 'test'
            },
        },
        {
            loader:path.join(__dirname,'./src/a-loader.js'),
            options:{
                a:1
            }
        },
       
    ],
    context: {
        emitFile: () => { }
    },
    readResource: fs.readFile.bind(fs)
},

    (err, result) => {
        err ? console.log(err) : console.log(result);
    })

