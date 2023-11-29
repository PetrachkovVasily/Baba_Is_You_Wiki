import React from "react"
import classes from './MyNavbar.module.css'
import { useParams } from "react-router-dom";

function MyNavbar({pages, setPages, paragraphs}) {
    const {id} = useParams();
    return (
        <div className={classes.navbar}>
            <a href="#pageTitle" className={classes.navTool}>{pages[pages.findIndex(page => page.pageId == id)].pageName}</a>
            <div className={classes.toolBlock}>
                {
                    paragraphs[pages.findIndex(page => page.pageId == id)].content.map((item) => {
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
