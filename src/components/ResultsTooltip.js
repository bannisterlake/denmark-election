import { makeStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

const styles = makeStyles({
    tooltipRoot: {
        background: 'white',
        opacity: 1
    }, 
    titleDiv: {
        fontSize: 18, 
        paddingBottom: 5
    }, 
    regionName: {
        fontSize: 28, 
        fontWeight: 'bold'
    },
    body: {

    }, 
    winnerName: {
        fontSize: 24, 
        color: 'white', 
        padding: 5
    }, 
    leadingBy: {
        color: 'white', 
        padding: '0px 5px 5px 5px', 
        fontSize: 16, 
    }
})

export default function ResultsTooltip({region, results, colour}) {
    const classes = styles()
    return (
        <div className={classes.tooltipRoot}>
            <div className={classes.titleDiv}>
                <div className={classes.regionName}>
                    {region}
                </div>
                <div className={classes.pollsDiv}>
                    {results.polls.reported} / {results.polls.total} polls reported
                </div>
            </div>
            {results.polls.reported &&  <div className={classes.body} style={{background: colour}}>
                <div className={classes.winnerName}>{results.choice[0].party.name}</div>
                {results.choice[0].votes && <div className={classes.leadingBy}>Leading by {(results.choice[0].votes.total - results.choice[1].votes.total).toLocaleString('de-DE')} votes</div>}
            </div>}
            
        </div>
    )
}
