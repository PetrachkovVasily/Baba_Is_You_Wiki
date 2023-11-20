import React, { useState } from "react"
import classes from './MyCommentBlock.module.css'
import logo from  '../../../images/accountlogo.png'
import MyComment from "../comment/MyComment";


function MyCommentBlock({currentID, comments, setComments}) {
    const [commText, setCommText] = useState('');
    
    function changeCommText(event) {
        setCommText(event.target.value);
    }

    function addComment(event) {
        setComments(
            comments.map((page) => {
                if (page.pageId === currentID) {
                    let currentComments = [...page.pageComments];
                    currentComments = [
                        ...currentComments,
                        {userName: 'Current user', commentDate: Date.now(), commentText: commText}
                    ]
                    return {...page, pageComments: currentComments}
                } else {
                    return page;
                }
            })  
        );
        setCommText('');
    }
    return (
        <div id="comments" className={classes.commentBlock}>
            <h1 className={classes.commentH}>Comments</h1>
            <h1 className={classes.commentsNumber}>
                {comments[comments.findIndex(comment => comment.pageId == currentID)].pageComments.length} comments
            </h1>
            <div className={classes.line}></div>
            <div className={classes.comLine}>
                <img src={logo} width={60} height={60} alt="User icon"/>
                <input placeholder="Comment" className={classes.comInput} value={commText} onChange={changeCommText}/>
                <button onClick={addComment} className={classes.comBtn}>Add comment</button>
            </div>
            {
                comments[comments.findIndex(comment => comment.pageId == currentID)].pageComments.map((item) => {
                    return (
                      <MyComment comment={item}/>
                    );
                  })
            }            
        </div>
    )
}

export default MyCommentBlock
