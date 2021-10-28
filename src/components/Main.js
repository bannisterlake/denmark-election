import React, { useState, useEffect } from 'react'
import Map from './Map'
import ResultsModal from './ResultsModal'
import Test from './Test'

export default function Main() {
    return (
        <div id="App">
            {/* <Test /> */}
            <Map />
            <ResultsModal />
        </div>
    )
}
