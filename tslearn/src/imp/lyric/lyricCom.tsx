import * as React from 'react';
import Lyric, { IHandler, ILyricLine, ILyric } from './util';
const song = {
  sgc: false,
  sfy: false,
  qfy: false,
  lrc: {
    version: 14,
    lyric:
      '[00:01.623]作词 : 薛之谦\n[00:02.855]作曲 : 王圆坤 薛之谦\n[00:03.534]你像多轻易就能吸引我\n[00:11.509]不紧抱不挣脱你的俘获\n[00:18.080]比较像我 可以接受点折磨\n[00:25.639]也不喜欢示弱\n[00:35.761]你会多隆重的来邀请我\n[00:43.930]不追问不揭穿你的冷漠\n[00:50.304]快透支我 感情最后要挥霍\n[00:57.867]越停顿越难过\n[01:05.495]我听过 你爱不爱你爱 不爱我\n[01:12.986]我问过 你要不要你要 不要我\n[01:21.598]我忘了 你说没说你说爱着我还是厌倦我 哪句多\n[01:52.447]你隔多久会招惹新的我\n[02:00.538]自己问自己答一些如果\n[02:06.990]快耗尽我 一种反复的折磨\n[02:14.558]在你附近存活\n[02:22.180]我听过 你爱不爱你爱 不爱我\n[02:30.272]我问过 你要不要你要 不要我\n[02:38.290]我忘了 你说没说你说爱着我还是厌倦我 哪句多\n[03:27.406]我听过 你爱不爱你爱 不爱我\n[03:34.823]我问过 你要不要你要 不要我\n[03:43.300]我试过 好说歹说都不再会有效果 原来你 不爱我\n[04:06.536]制作人：陈牧荻\n[04:07.027]编曲：陈牧荻\n[04:07.458]弦乐编写：陈牧荻 王小嫚\n[04:07.901]合音：王小嫚 陈牧荻\n[04:08.315]弦乐团：国际首席爱乐乐团\n[04:08.741]录音师：王晓海@录顶技Studios.\n[04:09.173] 洪士诚@录顶技Studios\n[04:09.607] 郑昊杰@2496 Top Studios.\n[04:10.003]录音助理：少天@录顶技Studios\n[04:10.436]混音师：杨祎@Raysound Studio\n[04:10.842]母带：全相彦@OKmastering Studio\n',
  },
  klyric: { version: 0, lyric: '' },
  tlyric: { version: 0, lyric: '' },
  code: 200,
};

interface IDeHandler {
  (params: any): any;
}
type DeHandler = (params: any) => any;
export class Debounced {
  /**
   *
   * @param fn 要执行的函数
   * @param awit  时间
   * @param immediate 是否在触发事件后 在时间段n开始，立即执行，否则是时间段n结束，才执行
   */
  static use(fn: DeHandler, awit = 1000, immediate = false) {
    let timer: NodeJS.Timeout | null;
    return (...args: any) => {
      if (timer) clearInterval(timer);
      if (immediate) {
        if (!timer) fn.apply(this, args);
        timer = setTimeout(function () {
          //n 秒内 多次触发事件,重新计算.timeer
          timer = null; //n 秒内没有触发事件 timeer 设置为null，保证了n 秒后能重新触发事件 flag = true = !timmer
        }, awit);
      } else {
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, awit);
      }
    };
  }
}
export default function Index() {
  const handler = ({ time, txt }: ILyricLine): void => {
    console.log(`${time},${txt}`);
  };
  const curretLy = React.useRef<ILyric>();
  React.useEffect(() => {
    curretLy.current = new Lyric(song.lrc.lyric, handler, 1);
    console.log(curretLy.current.lines);
  }, []);

  const play = () => {
    curretLy.current?.play();
    curretLy.current?.seek(0);
  };
  const stop = () => {
    curretLy.current?.stop();
  };
  return (
    <div>
      <button onClick={play}>播放</button>‘<button onClick={stop}>暂停</button>
    </div>
  );
}
