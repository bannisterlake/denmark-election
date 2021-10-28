import React from 'react'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
    root:{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 

    }, 
    container: {
        width: '80%', 
        backgroundColor: 'aliceblue',
        display: 'flex', 
        flexDirection: 'row', 
        '& #box':  {
            border: '1px solid transparent',
            '&:hover': {
                
                border: '1px solid black'
            }
        }
    }
})

export default function Test() {
    const classes = styles()
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {[0,1,2,3].map(el=>{
                    return (
                    <div id="box">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </div>)

                })}
            </div>
            <hr />
            <div>
                {[0,1,2,3].map(el=>{
                        return (
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </div>)

                })}
            </div>
        </div>
    )
}
