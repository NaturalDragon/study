import React, { useEffect } from 'react';
import { SearchInterface } from "../interfaces/user";
import {  search } from '../actions/index'
export default class Search extends React.Component<SearchInterface>{
    searchFn = (key:string) => {
        const { dispatch } = this.props;
        console.log(key)
        dispatch(search(key))
    }
   
    render() {

        return (
            <div>


                <input onChange={e=>this.searchFn(e.target.value)}></input>


            </div>
        )
    }
}