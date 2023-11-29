import React, { useState } from "react"
import classes from './MyCommentBlock.module.css'
import logo from  '../../../images/accountlogo.png'
import MyComment from "../comment/MyComment";
import { useParams } from "react-router-dom";


function MyCommentBlock({comments, setComments}) {
    const {id} = useParams();
    

    const [commText, setCommText] = useState('');
    
    function changeCommText(event) {
        setCommText(event.target.value);
    }

    function addComment(event) {
        setComments(
            comments.map((page) => {
                console.log(id)
                if (page.pageId == id) {
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
        console.log(comments)
        setCommText('');
    }
    return (
        <div id="comments" className={classes.commentBlock}>
            <h1 className={classes.commentH}>Comments</h1>
            <h1 className={classes.commentsNumber}>
                {comments[comments.findIndex(comment => comment.pageId == id)].pageComments.length} comments
            </h1>
            <div className={classes.line}></div>
            <div className={classes.comLine}>
                <img src={logo} width={60} height={60} alt="User icon"/>
                <input placeholder="Comment" className={classes.comInput} value={commText} onChange={changeCommText}/>
                <button onClick={addComment} className={classes.comBtn}>Add comment</button>
            </div>
            {
                comments[comments.findIndex(comment => comment.pageId == id)].pageComments.map((item) => {
                    return (
                      <MyComment comment={item}/>
                    );
                  })
            }            
        </div>
    )
}

export default MyCommentBlock
