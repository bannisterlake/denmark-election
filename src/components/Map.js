import { makeStyles } from '@material-ui/core';
import React, {useContext, useEffect, useRef, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Tooltip, LayerGroup, FeatureGroup } from 'react-leaflet'
import * as topojson from "topojson-client";

import { ZoomOutMap } from '@material-ui/icons';
import {Context} from '../context'
import ResultsTooltip from './ResultsTooltip';

const styles = makeStyles({
    resetButton: {
        display: 'flex',
        boxShadow: '0 1px 4px rgba(0,0,0,0.65)',
        height: 30,
        width: 30,
        fontSize: '1.7rem !important',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        background: '#FFFFFF',
        cursor: 'pointer',  
        color: 'black !important'  
    },  
})

function Map() {
    const {state, dispatch} = useContext(Context)
    const [geo, setGeo] = useState(null)

    const mapRef = useRef(null)
    const geoRef = useRef(null)

    const classes = styles()

    useEffect(() => {
        try {
            let geoJson = convertToGeoJSON(state.geo)
            setGeo(geoJson)
        } catch (e) {
            console.log('error converting JSON')
        }
    }, [])

    const setMap = (map) => {
        try {
            console.log('setMap', geoRef.current.getBounds())
            map.fitBounds(geoRef.current.getBounds())
            dispatch({type: 'SET_MAP', map: map})
        } catch (e) {
            console.log('error setting map')
        }
    }

    const resetBounds = () => {
        try {
            state.map.fitBounds(geoRef.current.getBounds())
            dispatch({
                type: 'RESET'
            })
    
        } catch (e) {

        }
    }

    const convertToGeoJSON = (jsonData) => {
        if (jsonData.type === "Topology") {
            for (let key in jsonData.objects) {
              let geojson = topojson.feature(jsonData, jsonData.objects[key]);
              return geojson
            }
          } else {
            return jsonData;
            
          }
    }

    const getContestResults = (geo) => {
        try {
            let contestResults = state.data.ElectionEvent.contest.find(contest=>contest.area.name === geo.properties.NAME_1)
            if (contestResults) {
                return contestResults
            } 
        } catch (e) {

        }
    }


    const handleClick = (results, geo) => {
        try {
            dispatch({type: 'SET_SELECTED_RESULTS', results: results, region: geo.properties.NAME_1 })
        } catch (e) {
            console.log('error setting selected results')
        }
    }

    const getFill = (results) => {
        try {
            if (results) {
                if (results.choice[0].votes.total > 0) {
                    if (results.choice[0].party.color) {
                        return results.choice[0].party.color
                    }
                }
            } 
            return '#a3a3a3'
        } catch (e) {
            console.log('error getting fill')
        }
    } 

    return (
        <MapContainer 
            zoomSnap={0.5}
            whenCreated={setMap}
            center={[56.3, 11.5]} zoom={5} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={geoRef}>
        {geo && geo.features.map((geo, i)=> {
            let contestResults = getContestResults(geo)
            let fill = getFill(contestResults)
            return (
                    <GeoJSON
                        key={i}
                        data={geo}
                        eventHandlers={{
                            // mouseover: (e)=>e.layer.setStyle(selectedStyle),
                            // mouseout: resetFeature,
                            click: (e)=>handleClick(contestResults, geo),
                        }}
                        style={()=> {
                            return ({
                                color: 'black', 
                                fillColor: fill, 
                                fillOpacity: 0.5, 
                            })
                        }}
                    >
                        <Tooltip sticky={true}>
                            <ResultsTooltip region={geo.properties.NAME_1} colour={fill} results={contestResults}/>
                        </Tooltip>

                    </GeoJSON>
            )
        })
            
        }
        </FeatureGroup>
        <div style={{top: 70}} className={'leaflet-top leaflet-left'}>
            <div  className='leaflet-control'>
                {/* <button onClick={()=>console.log(state.map.getBounds())}>get bounds</button> */}
        
                <a id="zoomOut" 
                    className={`leaflet-control-zoom leaflet-bar ${classes.resetButton}`} 
                    onClick={resetBounds}
                    >
                    <ZoomOutMap />
                </a>
            </div>
        </div>
      </MapContainer>
    )
}

export default Map
