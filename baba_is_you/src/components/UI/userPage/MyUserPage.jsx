import React from "react"
import classes from './MyUserPage.module.css'
import acc from  '../../../images/accountlogo.png'
import { Link } from "react-router-dom";
import deleteBtn from  '../../../images/deleteBtn.png';

function MyUserPage({users, setUsers, currentUserID, pages, setCurrentUserID}) {
    const currentIndex = users.findIndex(user => user.userId == currentUserID);

    function handleDelete(event) {
        setUsers(
            users.map((user) => {
                if (user.userId == currentUserID) {
                    let currentPages = [...user.pages];
                    currentPages = currentPages.filter((page) => {
                        return page != event.target.id;
                    });
                    return {...user, pages: currentPages}
                } else {
                    return user;
                }
            })
        )
    }

    function signOut() {
        users[currentIndex].isAuth = false;
        setCurrentUserID(0)
    }
    return (
        <div className={classes.pageBlock}>
            <div className={classes.userBlock}>
                <img src={acc} width={180} height={180} alt="User icon"/>
                <div className={classes.headers}>
                    <h1 className={classes.name}>{users[currentIndex].userName}</h1>
                    <Link to={`/`} onClick={signOut} className={classes.outBtn}>Sign out</Link>
                </div>
            </div>
            <h1 className={classes.savedLinks}>Saved links</h1>
            <div className={classes.line}></div>
            <ul className={classes.linkList}>
                {
                    users[currentIndex].pages.map(page => {
                        return (
                            <li className={classes.linkElement} id={page} key={page}>
                                <Link className={classes.link} to={`/content/${pages[pages.findIndex(p => p.pageId == page)].pageId}`}>• {pages[pages.findIndex(p => p.pageId == page)].pageName}</Link>
                                <img key={page} id={page} onClick={handleDelete} src={deleteBtn} width={24} height={24} alt="delete"/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default MyUserPage
