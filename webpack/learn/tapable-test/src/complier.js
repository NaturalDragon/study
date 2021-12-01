const { SyncHook, AsyncSeriesHook } = require('tapable')

module.exports = class Complier {
    constructor() {
        this.hooks = {
            //加速
            accelerate: new SyncHook(['newSpeed']),
            //刹车
            brake: new SyncHook(),
            //计算平均速度
            calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routeList'])
        }
    }
    run(){
        this.accelerate(10);
        this.brake();
        this.calculateRoutes('Async', 'hook', 'demo')
    }
    accelerate(speed) {
        this.hooks.accelerate.call(speed);
    }
    brake() {
        this.hooks.brake.call();
    }
    calculateRoutes() {
        //执行异步钩子
        this.hooks.calculateRoutes.promise(...arguments).then(() => {
        }, err => {
            console.error(err);
        });

    }

}