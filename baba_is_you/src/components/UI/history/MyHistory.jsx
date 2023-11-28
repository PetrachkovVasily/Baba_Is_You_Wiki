import React from "react"
import classes from './MyHistory.module.css'
import back from  '../../../images/back.png'
import { Link } from "react-router-dom"

function MyHistory({history, pageName}) {
    console.log(history.pageHistory)
    return (
        <div className={classes.historyBlock}>
            <div style={{margin: 0, padding: 0, marginRight: '30px', display: 'flex', justifyContent: "space-between"}}>
                <h1 className={classes.pageTitle}>{pageName}</h1>
                <Link to="/content" style={{cursor: 'pointer',margin: 0, marginRight: '15px', padding: 0, display: "flex", textDecoration: 'none'}}>
                        <img src={back} width={24} height={24} alt="back to the page"/>
                        <h3 style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>Back</h3>
                </Link>
            </div>
            {
                history.pageHistory.map(userChanges => {
                    let date = new Date(userChanges.dateOfChange);
                    return (
                        <div>
                            <div className={classes.titleDiv}>
                                <h1 className={classes.changesTitle}>Changed by {userChanges.userName}</h1>
                                <h1 className={classes.titleDate}>{date.toLocaleString()}</h1>
                            </div>
                            <div className={classes.line}></div>
                            <ul className={classes.changesList}>
                                {
                                    userChanges.changes.map(change => {
                                        return (
                                            <li className={classes.changeElement}>{change}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MyHistory
