/** @format */

type direction = 'vertical' | 'horizental'
export interface IScrollProps {
    direction?: direction
    height?: number
    click?: boolean // 是否支持点击
    refresh?: boolean // 是否刷新
    onScroll?: Function // 滑动触发的回调函数
    onScrollTo?: (x: number, y: number) => void
    pullUp?: () => void // 上拉加载逻辑
    pullDown?: Function // 下拉加载逻辑
    pullUpLoading?: boolean // 是否显示上拉 loading 动画
    pullDownLoading?: boolean // 是否显示下拉 loading 动画
    bounceTop?: boolean // 是否支持向上吸顶
    bounceBottom?: boolean // 是否支持向下吸底
    children: React.ReactNode
}

export type ScrollProps = {
    direction: direction
    height?: number
    click?: boolean // 是否支持点击
    refresh?: boolean // 是否刷新
    onScroll?: () => void // 滑动触发的回调函数
    pullUp?: () => void // 上拉加载逻辑
    pullDown?: () => void // 下拉加载逻辑
    pullUpLoading?: boolean // 是否显示上拉 loading 动画
    pullDownLoading?: boolean // 是否显示下拉 loading 动画
    bounceTop?: boolean // 是否支持向上吸顶
    bounceBottom?: boolean // 是否支持向下吸底
    children: React.ReactNode
}
interface IVoidHandler {
    (): IReusltHandler
}
interface IScollToHandler {
    (a: number, b: number, c: number): void
}
interface IscrollToElementHander {
    (a: any, b: number): void
}
interface IReusltHandler {
    scrollTo: IScollToHandler
    scrollToElement: IscrollToElementHander
}
export interface IScrollFunc extends HTMLDivElement {
    getBScroll: IVoidHandler
}
