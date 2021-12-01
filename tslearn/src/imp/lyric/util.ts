/** @format */

import { type } from 'os';
import { title } from 'process';

/** @format */
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
const STATE_PAUSE = 0;
const STATE_PLAYING = 1;
interface ILyricConstructor {
  new (lrc: string, handler: IHandler, speed: number): ILyric;
}

export interface IHandler {
  (param: ILyricLine): void;
}
export interface IVoidHandler {
  (): void;
}
export interface IPlayHandler {
  (offset?: number, isSeek?: boolean): void;
}
export interface ISeekHandler {
  (offset: number): void;
}

export interface ITogglePlayHandler {
  (offset: number): void;
}
export interface ILyricLine {
  time: number;
  txt: string;
}

interface Tag {
  title?: 'ti';
  artist?: 'ar';
  album?: 'al';
  offset?: 'offset';
  by?: 'by';
}
interface ITagRegMap {
  (propName: string): Tag;
}
//let tagRegMap: ITagRegMap;
const tagRegMap = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by',
};

export interface ILyric {
  lrc: string;
  tags: ITagRegMap;
  lines: Array<ILyricLine>;
  handler: IHandler;
  state: number;
  curLineIndex: number;
  startStamp: number;
  _init: IVoidHandler;
  play: IPlayHandler;
  seek: ISeekHandler;
  stop: IVoidHandler;
  togglePlay: ITogglePlayHandler;
  //speed: number
  // offset: number
  //  timer?: any
}

const Lyric: ILyricConstructor = class Lyric implements ILyric {
  lrc: string;
  tags: ITagRegMap;
  lines: Array<ILyricLine>;
  handler: IHandler;
  state: number;
  curLineIndex: number;
  startStamp: number;
  private speed: number;
  private offset: number;
  private timer?: any;

  constructor(lrc: string, handler: IHandler, speed = 1) {
    this.lrc = lrc;
    this.tags = {} as ITagRegMap;
    this.lines = new Array<ILyricLine>(); // 这是解析后的数组，每一项包含对应的歌词和时间
    this.handler = handler; // 回调函数
    this.state = STATE_PAUSE; // 播放状态
    this.curLineIndex = 0; // 当前播放歌词所在的行数
    this.startStamp = 0; // 歌曲开始的时间戳
    this.speed = speed;
    this.offset = 0;
    this._init();
  }
  _init() {
    this._initTag();

    this._initLines();
  }
  play(offset = 0, isSeek = false) {
    if (!this.lines.length) {
      return;
    }
    this.state = STATE_PLAYING;

    this.curLineIndex = this._findcurLineIndex(offset);
    //现在正处于第this.curLineIndex-1行
    this._callHandler(this.curLineIndex - 1);
    this.offset = offset;
    this.startStamp = +new Date() - offset;

    if (this.curLineIndex < this.lines.length) {
      clearTimeout(this.timer);
      this._playRest(isSeek);
    }
  }

  togglePlay(offset: number) {
    if (this.state === STATE_PLAYING) {
      this.stop();
      this.offset = offset;
    } else {
      this.state = STATE_PLAYING;
      this.play(offset, true);
    }
  }

  stop() {
    this.state = STATE_PAUSE;
    this.offset = 0;
    clearTimeout(this.timer);
  }

  seek(offset: number) {
    this.play(offset, true);
  }
  private _initTag() {
    for (let tag in tagRegMap) {
      const tStr = tagRegMap[tag];
      const matches = this.lrc.match(new RegExp(`\\[${tStr}:([^\\]]*)]`, 'i'));
      this.tags[tag] = matches && (matches[1] || '');
    }
  }

  private _initLines() {
    const lines = this.lrc.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const result = timeExp.exec(line);
      if (!result) continue;
      const txt = line.replace(timeExp, '').trim();
      if (txt) {
        if (result[3].length === 3) {
          result[3] = (Number(result[3]) / 10).toString();
        }
        this.lines.push({
          time: Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + (Number(result[3]) || 0) * 10,
          txt,
        });
      }
      this.lines.sort(function (a, b) {
        return a.time - b.time;
      });
    }
  }
  private _findcurLineIndex(time: number) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i;
      }
    }
    return this.lines.length - 1;
  }

  private _callHandler(i: number) {
    if (i < 0) {
      return;
    }
    this.handler({
      txt: this.lines[i].txt,
      time: i,
    });
  }

  private _playRest(isSeek = false) {
    const line = this.lines[this.curLineIndex];
    let delay;
    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp);
    } else {
      //拿到上一行的歌词开始时间，算间隔
      const preTime = this.lines[this.curLineIndex - 1] ? this.lines[this.curLineIndex - 1].time : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++);
      if (this.curLineIndex < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest();
      }
    }, delay / this.speed);
  }

  changeSpeed(speed: number) {
    this.speed = speed;
  }
};

export default Lyric;
