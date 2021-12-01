 module.exports=  function(api, options, dirname) {
    // / console.log(dirname)
    return {
     // inherits: parentPlugin,
      manipulateOptions(options, parserOptions) {
          options.memChace = '12';
      },
      pre(file) {
        this.cache = new Map();
      
      },
      visitor: {
        StringLiteral(path, state) {
          this.cache.set(path.node.value, 1);
        }
      },
      post(file) {
        // console.log(this.cache);
        // console.log()
      }
    };
  } 