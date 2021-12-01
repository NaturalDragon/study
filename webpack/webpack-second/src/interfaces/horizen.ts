
export interface IHorizenProps{
    list:Array<IHorizenData>,
    title:string,
    value:string,
    handleClick:Function
}


export interface IHorizenData{
    key:string,
    name:string
}