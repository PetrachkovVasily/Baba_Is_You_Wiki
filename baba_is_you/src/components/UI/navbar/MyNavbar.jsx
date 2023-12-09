import React, { useState } from "react"
import classes from './MyNavbar.module.css'
import { useParams } from "react-router-dom";

function MyNavbar({pages, setPages, paragraphs, users, setUsers, currentUserID, visible, setVisible}) {
    const {id} = useParams();
    const [isSaved, setIsSaved] = useState('Save');

    function saveBtn(event) {
        if (currentUserID == 0) {
            setVisible(true)
            return;
        }
        if (!users[users.findIndex(user => user.userId == currentUserID)].pages.includes(parseInt(id))) {
            console.log(users[users.findIndex(user => user.userId == currentUserID)].pages)
            setIsSaved('Saved')
            console.log(222)
            setUsers(
                users.map((user) => {
                    if (user.userId == currentUserID) {
                        let currentPages = [...user.pages];
                        currentPages = [...currentPages, parseInt(event.target.id)]
                        return {...user, pages: currentPages}
                    } else {
                        return user;
                    }
                })
            )
        }
        
    }

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
            <h1 id={id} onClick={saveBtn} className={classes.saveBtn}>{isSaved}</h1>
        </div>
    )
}

export default MyNavbar
