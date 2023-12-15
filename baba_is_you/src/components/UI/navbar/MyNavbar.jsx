import React, { useEffect, useState } from "react"
import classes from './MyNavbar.module.css'
import { useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import db from "../../../firebase";

function MyNavbar({content, setContent, pages, setPages, paragraphs, users, setUsers, currentUserID, visible, setVisible}) {
    const {id} = useParams();
    const [isSaved, setIsSaved] = useState('Save');

    function saveState() {
       
    }

    useEffect(() => {
        if (users[users?.findIndex(user => user.userId == currentUserID)]?.pages.includes(parseInt(id))) {
            setIsSaved('Saved')
        } 
    }, [])
    saveState()

    async function saveBtn(event) {
        if (currentUserID == 0) {
            setVisible(true)
            return;
        }
        if (!users[users?.findIndex(user => user.userId == currentUserID)]?.pages.includes(parseInt(id))) {
            setIsSaved('Saved')
            setUsers(
                users?.map((user) => {
                    if (user.userId == currentUserID) {
                        let currentPages = [...user.pages];
                        currentPages = [...currentPages, parseInt(event.target.id)]

                        const docRef = doc(db, 'users', user.userId.toString());
                        const payload = {...user, pages: currentPages};
                        setDoc(docRef, payload);

                        return {...user, pages: currentPages}
                    } else {
                        return user;
                    }
                })
            )
        } else {
            setIsSaved('Save')
            setUsers(
                users.map((user) => {
                    if (user.userId == currentUserID) {
                        let currentPages = [...user.pages];
                        currentPages = currentPages.filter((page) => {
                            return page != event.target.id;
                        });

                        const docRef = doc(db, 'users', user.userId.toString());
                        const payload = {...user, pages: currentPages};
                        setDoc(docRef, payload);

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
            <a href="#pageTitle" className={classes.navTool}>{pages[pages?.findIndex(page => page.pageId == id)]?.pageName}</a>
            <div className={classes.toolBlock}>
                {
                    content?.map((paragraph) => {
                        if (paragraphs[pages?.findIndex(page => page.pageId == id)]?.content.includes(paragraph.paragraphID)) {
                            return (
                                       <div key={paragraph.paragraphID} style={{margin: 0, padding: 0}}>
                                            <a href={'#' + paragraph.paragraphID} className={classes.pTool}>{paragraph.paragraphName}</a>
                                            <p/>
                                        </div> 
                                    )
                        }
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
