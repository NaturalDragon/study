import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {selectSubreddit,invalidateSubreddit,fecthPostsIfNeeded} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'
class Reddit extends Component{
  static propTypes={
      selectedSubreddit:PropTypes.string.isRequired
  }
  componentDidMount(){
      const {dispatch,selectedSubreddit}=this.props;
      dispatch(fecthPostsIfNeeded(selectedSubreddit))
  }
  componentDidUpdate(prevProps) {
    debugger
    if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fecthPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange=nextSubreddit=>{
      this.props.dispatch(selectSubreddit(nextSubreddit))
  }
  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fecthPostsIfNeeded(selectedSubreddit))
  }
  render(){
      const {selectedSubreddit,isFetching,items}=this.props
      const isEmpty = items.length === 0
      return(
          <div>
                <Picker value={selectedSubreddit}
                onChange={this.handleChange}
               options={['reactjs','fontend']}
                ></Picker>
                <p>
          {/* {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          } */}
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={items} />
            </div>
        }
          </div>
      )
  }

}
const mapStateToProps=state=>{
    const {selectedSubreddit,postsBySubreddit}=state;
    const {isFetching,items,ditInvalidate}=postsBySubreddit[selectedSubreddit]
    ||{
        isFetching:true,items:[]
    }
    return {
        selectedSubreddit,
        items,
        isFetching,
        ditInvalidate
    }
}
export default connect(mapStateToProps)(Reddit)