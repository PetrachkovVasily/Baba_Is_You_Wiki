import React from "react"
import classes from './MyCommentBlock.module.css'
import logo from  '../../../images/accountlogo.png'


function MyCommentBlock({children, comments}) {
    return (
        <div id="comments" className={classes.commentBlock}>
            <h1 className={classes.commentH}>Comments</h1>
            <h1 className={classes.commentsNumber}>
                {comments.length} comments
            </h1>
            <div className={classes.line}></div>
            <div className={classes.comLine}>
                <img src={logo} width={60} height={60} alt="User icon"/>
                <input placeholder="Comment" className={classes.comInput}/>
            </div>
            {children}            
        </div>
    )
}

export default MyCommentBlock
