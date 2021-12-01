const Complier = require('./complier')

class MyPlugin {
    constructor() { }
    apply(complier) {
        //绑定同步钩子
        complier.hooks.brake.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'));

        //绑定同步钩子 并传参
        complier.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));

        //绑定一个异步Promise钩子
        complier.hooks.calculateRoutes.tapPromise("calculateRoutes tapPromise", (source, target, routesList, callback) => {
            // return a promise
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`tapPromise to ${source} ${target} ${routesList}`)
                    resolve();
                }, 1000)
            })
        });

    }
}


const myPlugin=new MyPlugin();
const options={
    plugins:[myPlugin]
}
const complier=new Complier();
for (const plugin of options.plugins) {
        if(typeof plugin==='function'){
            plugin.call(complier,complier)
        }else{
            plugin.apply(complier)
        }
}
complier.run()