/** @format */
import {ISongData, ISongAR} from '@/interfaces/song'
export class Debouce {
    static init(func: Function | undefined, delay: number) {
        let timer: number
        return (...args: any) => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                if (func) {
                    func.apply(this, args)
                }
                clearTimeout(timer)
            }, delay)
        }
    }
}

export function makeActionCreator(type: string, ...argNames: any) {
    return function (...args: any) {
        let action = {type}
        argNames.forEach((arg: any, index: number) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}
// 处理歌手列表拼接歌手名字
export const getName = (list: Array<ISongAR>) => {
    let str = ''
    list.map((item: ISongAR, index: number) => {
        str += index === 0 ? item.name : '/' + item.name
        return item
    })
    return str
}
export const formatPlayTime = (interval: number): string => {
    interval = interval | 0
    const minute = (interval / 60) | 0
    const second = (interval % 60).toString().padStart(2, '0')
    return `${minute}:${second}`
}
//判断一个对象是否为空对象
export const isEmptyObject = (obj: object) => !obj || Object.keys(obj).length === 0

//拼接出歌曲的url链接
export const getSongUrl = (id: string): string => {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// 随机算法
export function shuffle(arr: Array<ISongData>): Array<ISongData> {
    let new_arr = new Array<ISongData>()
    arr.forEach(item => {
        new_arr.push(item)
    })
    for (let i = 0; i < new_arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = new_arr[i]
        new_arr[i] = new_arr[j]
        new_arr[j] = t
    }
    return new_arr
}

// 找到当前的歌曲索引
export const findIndex = (song: ISongData, list: Array<ISongData>): number => {
    return list.findIndex(item => {
        return song.id === item.id
    })
}
