import React from "react"
import classes from './MyHistory.module.css'
import back from  '../../../images/back.png'
import { Link, useParams } from "react-router-dom"

function MyHistory({history, pages, pageHistory, setPageHistory}) {
    const {id} = useParams();

    return (
        <div className={classes.historyBlock}>
            <div style={{margin: 0, padding: 0, marginRight: '30px', display: 'flex', justifyContent: "space-between"}}>
                <h1 className={classes.pageTitle}>{pages[pages.findIndex(page => page.pageId == id)]?.pageName}</h1>
                <Link to={`/content/${id}`} style={{cursor: 'pointer',margin: 0, marginRight: '15px', padding: 0, display: "flex", textDecoration: 'none'}}>
                        <img src={back} width={24} height={24} alt="back to the page"/>
                        <h3 style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>Back</h3>
                </Link>
            </div>
            {
                pageHistory?.map((userChanges) => {
                    if (history[history?.findIndex(page => page.pageId == id)]?.pageHistory.includes(userChanges.historyId)) {
                        return (
                            <div key={userChanges.historyId}>
                                <div className={classes.titleDiv}>
                                    <h1 className={classes.changesTitle}>Changed by {userChanges.userName}</h1>
                                    <h1 className={classes.titleDate}>{userChanges.dateOfChange.toDate().toDateString()}</h1>
                                </div>
                                <div className={classes.line}></div>
                                <ul className={classes.changesList}>
                                    {
                                        userChanges?.changes?.map((change, index) => {
                                            return (
                                                <li key={`${userChanges.historyId}${index}`} className={classes.changeElement}>{change}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

export default MyHistory
