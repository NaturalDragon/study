import{useEffect,useRef} from 'react'
import com from '../../utils/common'
import Player from 'griffith'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
function Detail(props) {
    const { location } = props
    const name = com.GetQueryUrlString(location.search, 'id')
    const he = window.innerHeight;
    const wi = window.innerWidth;
    const url = `${window.AppSetting.serverIp}/UploadFiles/${name}`;
    const sources = {
        hd: {
            play_url: `${window.AppSetting.serverIp}/UploadFiles/${name}`,
        },
        sd: {
            play_url: `${window.AppSetting.serverIp}/UploadFiles/${name}`,
        },
    }
    const playerRef=useRef()
    useEffect(()=>{
        var options = {
            autoplay: true, // 自动播放
            language: 'zh-CN',
            preload: 'auto', // 自动加载
            errorDisplay: true, // 错误展示
            width: wi, // 宽
            height: he,
            flash: {
              swf: '/video-js.swf',
            },
            sources: [
              {
                src: url,
                //type: 'rtmp/flv', // 类型可加可不加，目前未看到影响
              },
            ],
          };

        var player = videojs(playerRef.current, options, function onPlayerReady() {
          videojs.log('Your player is ready!');
        debugger
          // In this context, `this` is the player that was created by Video.js.
          this.play();
        
          // How about an event listener?
          this.on('ended', function() {
            videojs.log('Awww...over so soon?!');
          });
        });
    },[])
    return <div>
        <video
         ref={playerRef}
         id="my-player"
    className="video-js"
        ></video>
      
        {/* <video
         id="my-player"
    className="video-js"
     preload='preload' controls='controls' width='100%' height={he}
            src={`${window.AppSetting.serverIp}/UploadFiles/${name}`}></video> */}
        {/* <Player sources={sources} /> */}

        {/* <object type="video/x-msvideo" data={`${window.AppSetting.serverIp}/UploadFiles/${name}`} width="320" height="240">
            <param name="src" value={`${window.AppSetting.serverIp}/UploadFiles/${name}`} />
            <param name="autostart" value="true" />
            <param name="controller" value="true" />
        </object> */}
        {/* <object id="video" width="400" height="200" border="0" classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA">
            <param name="ShowDisplay" value="0" />
            <param name="ShowControls" value="1" />
            <param name="AutoStart" value="1" />
            <param name="AutoRewind" value="0" />
            <param name="PlayCount" value="0" />
            <param name="Appearance" value="0" />
            <param name="BorderStyle" value="0" />
            <param name="MovieWindowHeight" value="240" />
            <param name="MovieWindowWidth" value="320" />
            <param name="FileName" value={url} />
            <embed width="400" height="200" border="0" showdisplay="0" showcontrols="1" autostart="1"
                autorewind="0" playcount="0" moviewindowheight="240" moviewindowwidth="320" filename={url} src={url}>
            </embed>
        </object> */}

        {/* <embed src={url} /> */}
    </div>
}

export default Detail;