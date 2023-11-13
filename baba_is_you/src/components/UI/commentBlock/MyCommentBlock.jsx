import React from "react"
import classes from './MyCommentBlock.module.css'

function MyCommentBlock({children}) {
    return (
        <div className={classes.commentBlock}>
            <h1 className={classes.commentH}>Comments</h1>
            <h1 className={classes.commentsNumber}>
                {'999 comments'}
            </h1>
            <div className={classes.line}></div>
            <div className={classes.comLine}>
                <img src="https://www.svgrepo.com/show/453446/account.svg" width={60} height={60} alt="User icon"/>
                <input placeholder="Comment" className={classes.comInput}/>
            </div>
            {children}            
        </div>
    )
}

export default MyCommentBlock
