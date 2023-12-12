import React, { useState } from "react"
import classes from './MyCommentBlock.module.css'
import logo from  '../../../images/accountlogo.png'
import MyComment from "../comment/MyComment";
import { useParams } from "react-router-dom";


function MyCommentBlock({pageComments, setPageComments, comments, setComments, setVisible, currentUserID, users, setUsers}) {
    const {id} = useParams();
    

    const [commText, setCommText] = useState('');
    
    function changeCommText(event) {
        setCommText(event.target.value);
    }

    function addComment(event) {
        if (currentUserID == 0) {
            setVisible(true)
            return;
        }
        const newComment = checkRaduce(pageComments);
        setPageComments( //добавить шаманство с датой
            [...pageComments, {userName: users[users?.findIndex(user => user.userId == currentUserID)]?.userName, commentId: newComment, commentDate: Date.now(), commentText: commText}]
        )
        setComments(
            comments.map((page) => {
                if (page.pageId == id) {
                    let currentComments = [...page.pageComments];
                    currentComments = [
                        ...currentComments, newComment
                    ]
                    return {...page, pageComments: currentComments}
                } else {
                    return page;
                }
            })  
        );
        setCommText('');
    }

    function checkRaduce (content) {
        if (content?.length > 0)
            return content?.reduce((previous, current) => previous.paragraphID > current.paragraphID ? previous : current).paragraphID + 1;
        else
            return 1;
    }

    return (
        <div id="comments" className={classes.commentBlock}>
            <h1 className={classes.commentH}>Comments</h1>
            <h1 className={classes.commentsNumber}>
                {comments[comments?.findIndex(comment => comment.pageId == id)]?.pageComments.length} comments
            </h1>
            <div className={classes.line}></div>
            <div className={classes.comLine}>
                <img src={logo} width={60} height={60} alt="User icon"/>
                <input placeholder="Comment" className={classes.comInput} value={commText} onChange={changeCommText}/>
                <button onClick={addComment} className={classes.comBtn}>Add comment</button>
            </div>
            {
                pageComments?.map((comment) => {
                    if (comments[comments?.findIndex(page => page.pageId == id)]?.pageComments.includes(comment.commentId)) {
                        return (
                        <MyComment key={comment.commentId} comment={comment}/>
                        );
                    }
                })
            }            
        </div>
    )
}

export default MyCommentBlock
