import React from "react"
import classes from './MyComment.module.css'

function MyComment() {
    return (
        <div>
            <div className={classes.commentName}>
                <img src="https://www.svgrepo.com/show/453446/account.svg" width={60} height={60} alt="User icon"/>
                <div className={classes.comHead}>
                    <h1 className={classes.userName}>{'User name'}</h1>
                    <h4 className={classes.commentDate}>{'comment date'}</h4>
                </div>
            </div>
            <div style={{marginLeft: '90px', marginTop: '0px', fontSize: '18px', width: '540px'}}>
                    {'user textuser textuser textuser textuser textuser textuser textuser textuser textuser textuser textuser textuser textuser textuser textuser text'}
            </div>
        </div>
    )
}

export default MyComment
