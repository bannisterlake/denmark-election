import React, { useState, useContext, useEffect } from 'react'
import {Context} from '../context'
import { makeStyles, Modal, Paper, Table, TableHead, TableContainer, TableRow, TableCell, TableBody, Tab} from '@material-ui/core'

const styles = makeStyles({
    modalRoot: {
        width: '80%', 
        height: '80%', 
        margin: '4% 9% auto 9%', 
        padding: '1%',
        borderRadius: 10, 
        background: '#ddddddc4', 
        display: 'flex',
        flexDirection: 'column',
        // border: '2px solid #646464', 
        boxShadow: '0px 0px 10px 2px black', 
        position: 'relative', 
        overflow: 'hidden'
    }, 
    modalTitle: {
        padding: '5px 0',
        fontSize: 30, 
        fontWeight: 'bold', 
    },
    tableContainer: {
        // background: 'white', 
        opacity: 1,
        borderRadius: 5, 
        maxWidth: '100%',
        maxHeight: '100%',
        position: 'relative', 
        overflow: 'auto', 
        '& #numberHeads': {
            paddingRight: '16px', 
            fontWeight: 600
        }
    }, 
    table: {
        maxHeight: '100%', 
        position: 'relative',
        overflow: 'hidden',
    },
    tableHead: {
        '& th': {
            fontSize: '18px', 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            padding: 5, 
            zIndex: 102
        }
    }, 
    partyContainer: {
        background: '#e1e1e1d9', 
        position: 'relative', 
        '& td': {
            padding: '0px 20px 0px 0px',
            fontSize: '24px',
            alignItems: 'center', 
            fontWeight: 600,
            '& #numberCells': {
                fontSize: 18,

            }
        }, 
        '& #percentSpan': {
            fontSize: 20, 
            position: 'absolute', 

        }
    }, 
    partyCell: {
        display: 'flex'
    }, 
    partyCode: {
        width: 50,
        height: 50, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        fontWeight: 'bold'
    }, 
    partyName: {
        alignSelf: 'center', 
        fontWeight: 'bold', 
        flexGrow: 1, 
        height: 50, 
        alignItems: 'center', 
        display: 'flex', 
        '& span': {
            paddingLeft: 5, 
            zIndex: 101
        }
    }, 
    innerBar: {
        height: 50, 
        position: 'absolute', 
        background: 'aliceblue', 
        zIndex: 100, 
        opacity: 0.3
    }
})

export default function ResultsModal() {
    const {state, dispatch} = useContext(Context)
    const classes = styles()
    
    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL'})
    }

    return (
        <Modal id="ResultsModal" open={state.modalOpen} onClose={closeModal}>
            {state.results && <div id="modalRoot" className={classes.modalRoot}>
                <div className={classes.modalTitle}>REGION {state.results.area.name.toUpperCase()}</div>
                <TableContainer className={classes.tableContainer} sx={{ maxHeight: '100%' }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell style={{width: '15%'}} id="numberHeads" align='right'>%</TableCell>
                            <TableCell style={{width: '15%'}} id="numberHeads"align='right'>+/-</TableCell>
                            <TableCell style={{width: '15%'}} id="numberHeads"align='right'>Mandat</TableCell>
                            <TableCell style={{width: '15%'}} id="numberHeads"align='right'>+/-</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {state.results.choice.map((party, i)=>{
                        let getPercentChange = party.votes.votePercent - party.previousVotes.votePercent
                        let getSeatChange = party.votes2.total - party.previousVotes2.total
                        return (
                            <TableRow key={i} className={classes.partyContainer}>
                                <TableCell>
                                    <div className={classes.partyCell}>
                                        <div className={classes.partyCode} style={{background: party.party.color ? party.party.color : '#a3a3a3'}}>{party.party.nameShort}</div>
                                        <div className={classes.partyName}>
                                            <span>
                                                {party.name}
                                            </span>
                                            <div className={classes.innerBar} style={{background: party.party.color ? party.party.color : '#a3a3a3', width: `${party.votes.votePercent}%`}}/>

                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell id="numberCells" align='right'>{party.votes.votePercent.toLocaleString('de-DE', {maximumFractionDigits: 1, minimumFractionDigits: 1})}<span id="percentSpan">%</span></TableCell>
                                <TableCell id="numberCells" align='right' style={{color: getPercentChange > 0 ? '#378737': (getPercentChange < 0 ? '#cf0000' : 'black')}}>{getPercentChange > 0 && '+'}{getPercentChange.toLocaleString('de-DE', {maximumFractionDigits: 1, minimumFractionDigits: 1})}<span id="percentSpan">%</span></TableCell>
                                <TableCell id="numberCells" align='right'>{party.votes2.total}</TableCell>
                                <TableCell id="numberCells" align='right' style={{color: getSeatChange > 0? '#378737': (getSeatChange < 0 ? '#cf0000' : 'black')}}>{getSeatChange}</TableCell>
                            </TableRow>
                            )
                        })} 
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>}
        </Modal>
    )
}
