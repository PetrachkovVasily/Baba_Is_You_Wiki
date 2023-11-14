import React from "react"
import classes from './MyComment.module.css'
import logo from  '../../../images/accountlogo.png'

function MyComment({comment}) {
    return (
        <div>
            <div className={classes.commentName}>
                <img src={logo} width={60} height={60} alt="User icon"/>
                <div className={classes.comHead}>
                    <h1 className={classes.userName}>{comment.userName}</h1>
                    <h4 className={classes.commentDate}>{comment.commentDate}</h4>
                </div>
            </div>
            <div style={{marginLeft: '90px', marginTop: '0px', fontSize: '18px', width: '540px'}}>
                    {comment.commentText}
            </div>
        </div>
    )
}

export default MyComment
