import React from "react"
import classes from './MyNavbar.module.css'

function MyNavbar() {
    return (
        <div className={classes.navbar}>
            <h2 className={classes.navTool}>{'Page name'}</h2>
            <div className={classes.toolBlock}>
                <h3 className={classes.pTool}>{'paragraph name'}</h3>
                <h3 className={classes.pTool}>{'paragraph name'}</h3>
            </div>
            <h2 className={classes.navTool}>{'Category'}</h2>
            <h2 className={classes.navTool}>{'Comments'}</h2>
        </div>
    )
}

export default MyNavbar
