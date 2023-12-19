import React, { useState } from "react"
import classes from './MyCommentBlock.module.css'
import logo from  '../../../images/accountlogo.png'
import MyComment from "../comment/MyComment";
import { useParams } from "react-router-dom";
import { Timestamp } from 'firebase/firestore'
import { doc, setDoc } from "firebase/firestore";
import db from "../../../firebase";


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
        if (document.getElementById('comm').value == '') {
            return;
        }
        const newComment = checkComm(pageComments);
        setPageComments( //добавить шаманство с датой
            [...pageComments, {userName: users[users?.findIndex(user => user.userId == currentUserID)]?.userName, commentId: newComment, commentDate: Timestamp.fromDate(new Date()), commentText: commText}]
        )

        const pageCommentsdocRef = doc(db, 'pageComments', newComment.toString());
        const pageCommentspayload = {userName: users[users?.findIndex(user => user.userId == currentUserID)]?.userName, 
                                    commentId: newComment, 
                                    commentDate: Timestamp.fromDate(new Date()), commentText: commText};
        setDoc(pageCommentsdocRef, pageCommentspayload);

        setComments(
            comments.map((page) => {
                if (page.pageId == id) {
                    let currentComments = [...page.pageComments];
                    currentComments = [
                        ...currentComments, newComment
                    ]
                    console.log(newComment)
                    const commentsdocRef = doc(db, 'comments', page.pageId.toString());
                    const commentspayload = {...page, pageComments: currentComments};
                    setDoc(commentsdocRef, commentspayload);
                    return {...page, pageComments: currentComments}
                } else {
                    return page;
                }
            })  
        );
        setCommText('');
    }

    function checkComm (pageComments) {
        if (pageComments?.length >= 0)
            return pageComments?.reduce((previous, current) => previous.paragraphID > current.paragraphID ? previous : current).commentId + 1;
        else
            return 1;
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
                <input id="comm" placeholder="Comment" className={classes.comInput} value={commText} onChange={changeCommText}/>
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
