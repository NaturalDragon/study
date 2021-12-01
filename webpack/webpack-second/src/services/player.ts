/** @format */

import {AxiosPromise} from 'axios'
import request from '@/api/reqeust'

export const getLyricRequest = (id: string): AxiosPromise<any> => {
    return request({
        url: `/lyric?id=${id}`,
        method: 'get',
    })
}
