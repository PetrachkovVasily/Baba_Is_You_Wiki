import React from "react"
import classes from './MyNavbar.module.css'

function MyNavbar({pageName, setPages, paragraphs}) {
    return (
        <div className={classes.navbar}>
            <a href="#pageTitle" className={classes.navTool}>{pageName}</a>
            <div className={classes.toolBlock}>
                {
                    paragraphs.map((item) => {
                        return (
                            <>
                                <a href={'#' + item.paragraphID} className={classes.pTool}>{item.paragraphName}</a>
                                <p/>
                            </>
                        );
                    })
                }
                
            </div>
            <a href="#category" className={classes.navTool}>{'Category'}</a>
            <p/> 
            <a href="#comments" className={classes.navTool}>{'Comments'}</a>
        </div>
    )
}

export default MyNavbar
