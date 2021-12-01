import React, { useEffect, useState, useReducer, Fragment } from 'react';
import axios from 'axios';
function Index() {
    const [data, setData] = useState({ hits: [] })
    const [query, setQuery] = useState('redux');
    const [search, setSearch] = useState('')
    const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=redux')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        async function feachData() {
            setIsLoading(true)
            setIsError(false)
            try {
                const result = await axios(
                    `https://hn.algolia.com/api/v1/search?query=${query}`,
                );
                setData(result.data);

            } catch (err) {
                setIsError(true)
            }
            setIsLoading(false)
        }
        feachData()
    }, [url,query]);

    return (
        <Fragment>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button type='button' onClick={() => {
                //  setSearch(query)
                setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
            }}>Search</button>
            {isError && <div>Something went wrong ...</div>}
            {
                isLoading ? <div>loading</div>
                    : <ul>
                        {
                            data.hits.map(item => (
                                <li key={item.objectID}><a>{item.title}</a></li>
                            ))
                        }
                    </ul>
            }

        </Fragment>
    )
}

export default Index;


//---------------------------------------------------------------------------------------

/**
 * custom hooks
 */
const useHackerNewsApi = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData)
    const [url, setUrl] = useState(initialUrl)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        async function feachData() {
            setIsLoading(true)
            setIsError(false)
            try {
                const result = await axios(
                    url,
                );
                setData(result.data);

            } catch (err) {
                setIsError(true)
            }
            setIsLoading(false)
        }
        feachData()
    }, [url]);

    return [{ data, isLoading, isError }, setUrl]
}

function App() {
    const [query, setQuery] = useState('redux');
    const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi(
        `https://hn.algolia.com/api/v1/search?query=${query}`, { hits: [] })
    return (
        <Fragment>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button type='button' onClick={() => {
                //  setSearch(query)
                doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
            }}>Search</button>
            {isError && <div>Something went wrong ...</div>}
            {
                isLoading ? <div>loading</div>
                    : <ul>
                        {
                            data.hits.map(item => (
                                <li key={item.objectID}><a>{item.title}</a></li>
                            ))
                        }
                    </ul>
            }

        </Fragment>
    )

}
//export default App;

//----------------------------------------------------------------------------------------------------------------

/**
 * custom hooks with reducer
 */
const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE'
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case FETCH_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false
            }
        case FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            throw new Error()

    }
}
const UserDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isError: false,
        isLoading: false,
        data: initialData
    })

    useEffect(() => {
        let didCancel = false
        const fetchData = async () => {
            dispatch({ type: FETCH_INIT })
            try {
                if (!didCancel) {
                    const result = await axios(url);
                    dispatch({
                        type: FETCH_SUCCESS,
                        payload: result.data
                    })
                }
            } catch (error) {
                dispatch({ type: FETCH_FAILURE })
            }

        }
        fetchData()
        return () => {
            didCancel = true
        }
    }, [url])
    return [state, setUrl]
}

function App1() {
    const [query, setQuery] = useState(() => {
        return 'redux'
    });
    const [{ data, isLoading, isError }, doFetch] = UserDataApi(
        `https://hn.algolia.com/api/v1/search?query=${query}`, { hits: [] })
    return (
        <Fragment>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button type='button' onClick={() => {
                //  setSearch(query)
                doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
            }}>Search</button>
            {isError && <div>Something went wrong ...</div>}
            {
                isLoading ? <div>loading</div>
                    : <ul>
                        {
                            data.hits.map(item => (
                                <li key={item.objectID}><a>{item.title}</a></li>
                            ))
                        }
                    </ul>
            }

        </Fragment>
    )

}
//export default App1;
function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count, step } = state;

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({ type: 'tick' });
        }, 1000);
        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <>
            <h1>{count}</h1>
            <input value={step} onChange={e => {
                dispatch({
                    type: 'step',
                    step: Number(e.target.value)
                });
            }} />
        </>
    );
}

const initialState = {
    count: 0,
    step: 1,
};


function reducer(state, action) {
    const { count, step } = state;
    if (action.type === 'tick') {
        return { count: count + step, step };
    } else if (action.type === 'step') {
        return { count, step: action.step };
    } else {
        throw new Error();
    }
}
//export default Counter;
