import React,{forwardRef} from 'react'
import { getName } from '../../api/utils'
import './index.less'
const SongList=forwardRef((props,refs)=>{

    const {collectCount,songs,showCollect }=props
    return(  <div className='songList'>
    <div className="first_line">
      <div className="play_all">
        <i className="iconfont">&#xe6e3;</i>
        <span > 播放全部 <span className="sum">(共 {songs.length} 首)</span></span>
      </div>
      {
          showCollect&& <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span > 收藏 ({(collectCount)})</span>
        </div>
      }
     
    </div>
    <div className='songItem'>
      {
        songs.map((item, index) => {
          return (
            <li key={index}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.ar)} - {item.al.name}
                </span>
              </div>
            </li>
          )
        })
      }
    </div>
  </div>)
})

SongList.defaultProps={
    collectCount:0,
    songs:[],
    showCollect:true
}

export default React.memo(SongList)