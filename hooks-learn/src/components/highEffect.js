

import React, { useCallback, useMemo, useState, useEffect } from 'react'

import axios from 'axios'
function SearchResults() {
    const getFetchUrl = useCallback((query) => {
        return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }, [])

    useEffect(() => {
        const url = getFetchUrl('react');
    }, [getFetchUrl])
    useEffect(() => {
        const url = getFetchUrl('redux')
    }, [getFetchUrl])

    return (<div>
        high
    </div>)
}

//xport default SearchResults;



function SearchResultTow() {
    const [query, setQuery] = useState('react')
    const getFetchUrl = useCallback(() => {
        return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }, [query])

    useEffect(() => {
        const url = getFetchUrl('react');
        console.log(url)
    }, [getFetchUrl])
    useEffect(() => {
        const url = getFetchUrl('redux')
        console.log(url)
    }, [getFetchUrl])

    return (<div>
        <input onChange={
            e => {
                setQuery(e.target.value)
            }
        }></input>
    </div>)
}

//export default SearchResultTow;


function Parent() {
    const [query, setQuery] = useState('react');

    /**
      * useCallback版本
      */
    // const fetchData = useCallback(async () => {
    //     const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query)
    //     return result.data;

    // }, [query])
    const fetchData = useMemo(async () => {
        const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query)
        return result.data;

    }, [query])
    return (
        <>
            <input onChange={
                e => {
                    setQuery(e.target.value)
                }
            }></input>
            <Child fetchData={fetchData}></Child>

        </>
    )


}

function Child({ fetchData }) {
    let [data, setData] = useState({ hits: [] })
    useEffect(() => {
        /**
         * useCallback版本
         */
        // fetchData().then(result=>{

        //     setData(result)
        // })
        debugger
        fetchData.then(result => {
            setData(result)
        })


    }, [fetchData])

    return (
        <ul>
            {
                data &&
                data.hits.map(item => (
                    <li key={item.objectID}><a>{item.title}</a></li>
                ))
            }
        </ul>)

}
export default Parent;