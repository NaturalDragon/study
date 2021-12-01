import {
    SET_CURRENT_SONG, SET_FULL_SCREEN, SET_PLAYING_STATE, SET_SEQUECE_PLAYLIST,
    SET_PLAYLIST, SET_PLAY_MODE, SET_CURRENT_INDEX,
    SET_SHOW_PLAYLIST
} from '../constants'
import { fromJS } from 'immutable'
import { playMode } from '../api/config'
const playList =
  [
    {
      "name":"伴云",
      "id":1447744711,
      "pst":0,
      "t":0,
      "ar":[
          {
              "id":12268138,
              "name":"Todd Li",
              "tns":[

              ],
              "alias":[

              ]
          }
      ],
      "alia":[

      ],
      "pop":100,
      "st":0,
      "rt":"",
      "fee":8,
      "v":4,
      "crbt":null,
      "cf":"",
      "al":{
          "id":89384686,
          "name":"伴云",
          "picUrl":"http://p3.music.126.net/wJwQFbgkqpFdJH8nZPWPwA==/109951164983554082.jpg",
          "tns":[

          ],
          "pic_str":"109951164983554082",
          "pic":109951164983554080
      },
      "dt":275381,
      "h":{
          "br":320000,
          "fid":0,
          "size":11017448,
          "vd":-41073
      },
      "m":{
          "br":192000,
          "fid":0,
          "size":6610486,
          "vd":-38480
      },
      "l":{
          "br":128000,
          "fid":0,
          "size":4407005,
          "vd":-36817
      },
      "a":null,
      "cd":"01",
      "no":1,
      "rtUrl":null,
      "ftype":0,
      "rtUrls":[

      ],
      "djId":0,
      "copyright":0,
      "s_id":0,
      "mark":64,
      "originCoverType":0,
      "noCopyrightRcmd":null,
      "rtype":0,
      "rurl":null,
      "mst":9,
      "cp":0,
      "mv":0,
      "publishTime":0
  },
    {
      "name":"我是一首小众歌曲",
      "id":1487507802,
      "pst":0,
      "t":0,
      "ar":[
          {
              "id":10942,
              "name":"钟声",
              "tns":[

              ],
              "alias":[

              ]
          },
          {
              "id":33165159,
              "name":"浅葱喵asagiinyo",
              "tns":[

              ],
              "alias":[

              ]
          }
      ],
      "alia":[

      ],
      "pop":95,
      "st":0,
      "rt":"",
      "fee":8,
      "v":3,
      "crbt":null,
      "cf":"",
      "al":{
          "id":96885146,
          "name":"我是一首小众歌曲",
          "picUrl":"http://p3.music.126.net/_isUZDMluJ0bFkovZtX1Sg==/109951165393417896.jpg",
          "tns":[

          ],
          "pic_str":"109951165393417896",
          "pic":109951165393417890
      },
      "dt":236773,
      "h":{
          "br":320000,
          "fid":0,
          "size":9473089,
          "vd":-35647
      },
      "m":{
          "br":192000,
          "fid":0,
          "size":5683871,
          "vd":-33045
      },
      "l":{
          "br":128000,
          "fid":0,
          "size":3789262,
          "vd":-31309
      },
      "a":null,
      "cd":"01",
      "no":1,
      "rtUrl":null,
      "ftype":0,
      "rtUrls":[

      ],
      "djId":0,
      "copyright":0,
      "s_id":0,
      "mark":0,
      "originCoverType":0,
      "noCopyrightRcmd":null,
      "rtype":0,
      "rurl":null,
      "mst":9,
      "cp":0,
      "mv":0,
      "publishTime":0
  },
    {
      ftype: 0,
      djId: 0,
      a: null,
      cd: '01',
      crbt: null,
      no: 1,
      st: 0,
      rt: '',
      cf: '',
      alia: [
        '手游《梦幻花园》苏州园林版推广曲'
      ],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: '拾梦纪',
        picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
        tns: [],
        pic_str: '109951164627180052',
        pic: 109951164627180050
      },
      name: '拾梦纪',
      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: '妖扬',
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: '金天',
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      id: 1416767593,
      publishTime: 0,
      rurl: null
    }
  ];
const defaultState = fromJS({
    fullScreen: false,//播放器是否为全屏模式
    playing: false,//当前歌曲是否播放
    sequencePlayList: playList,//顺序列表
    playList: playList,
    mode: playMode.sequence,//播放模式
    currentIndex: -1,//当前歌曲在播放列表的索引位置
    showPlayList: false,//是否展示播放列表
    currentSong: {}

})


export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_CURRENT_SONG:
            return state.set('currentSong', action.data);
        case SET_FULL_SCREEN:
            return state.set('fullScreen', action.data);
        case SET_PLAYING_STATE:
            return state.set('playing', action.data);
        case SET_SEQUECE_PLAYLIST:
            return state.set('sequencePlayList', action.data);
        case SET_PLAYLIST:
            return state.set('playList', action.data);
        case SET_PLAY_MODE:
            return state.set('mode', action.data);
        case SET_CURRENT_INDEX:
            return state.set('currentIndex', action.data);
        case SET_SHOW_PLAYLIST:
            return state.set('showPlayList', action.data);
        default:
            return state;
    }
}