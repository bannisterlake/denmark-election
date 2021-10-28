import React, {useEffect, useReducer, createContext, useState} from 'react';
import { useParams } from 'react-router';

export const Context = createContext(null);
const geo = require('./shapefiles/denmark_regions.json')

const initialState = {
    geo: geo, 
    map: null, 
    data: null, 
    zoomCenter: {
        zoom: 5, 
        center: [56.3,11.5]
    }, 
    results: null, 
    region: null, 
    modalOpen: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_MAP':
            return {
                ...state, 
                map: action.map
            }
        case 'RESET': {
            return {
                ...state, 
                zoomCenter: initialState.zoomCenter
            }
        }
        case 'SET_DATA': {
            return {
                ...state,
                data: action.data
            }
        }
        case 'SET_SELECTED_RESULTS': {
            return {
                ...state, 
                results: action.results, 
                region: action.region, 
                modalOpen: true
            }
        }
        case 'CLOSE_MODAL': {
            return {
                ...state, 
                modalOpen: false
            }
        }
        default:
            break;
    }

}


const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {year} = useParams()

    useEffect(()=>{
        getData()
    }, [])

    const getData = () => {
        fetch(`data/${year}/results2.json`)
            .then(res=>res.json())
            .then(json=> dispatch({type: 'SET_DATA', data: json}))
            .catch(e=>console.log(e, 'error fetching data'))
    }

    return (
        <Context.Provider value={{state, dispatch}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
