import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { changeArtistList ,changeCategory,changeAlpha} from '../../actions/singer'
import Horizen from '../../baseUI/horizen-item/index'
import { NavContainer } from './style'
import { categoryTypes, alphaTypes } from '../../api/config'
function Singer(props) {
    const { artistList ,category,alpha} = props;
    const { updateCategory,updateAlpha,getArtistListDataDispatch } = props;
    const artistListJS = artistList ? artistList.toJS() : []
    useEffect(() => {
        if (!artistList.size) {
            getArtistListDataDispatch()
        }
    }, [])
    const handleUpdateCategory = (newVal) => {
        if(category === newVal) return;
        updateCategory(newVal);
        
      };
      const handleUpdateAlpha= (newVal) => {
        if(alpha === newVal) return;
        updateAlpha(newVal);
        
      };
    return (<div>
        <NavContainer>
            <Horizen title={'分类(默认热门):'} value={category} list={categoryTypes} handleClick={handleUpdateCategory}></Horizen>
            <Horizen title='首字母:' value={alpha} handleClick={handleUpdateAlpha} list={alphaTypes}></Horizen>
        </NavContainer>

    </div>)
}

const mapStateToProps = (state) => {
    debugger
    return {
        category:state.getIn(['singer','category']),
        alpha:state.getIn(['singer','alpha']),
        artistList: state.getIn(['singer', 'artistList'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCategory(newVal){
            dispatch(changeCategory(newVal))
        },
        updateAlpha(newVal){
            dispatch(changeAlpha(newVal))
        },
        getArtistListDataDispatch() {
            dispatch(changeArtistList())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));