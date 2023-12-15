import React from "react";
import classes from "./MySubCatPage.module.css"
import edit from  '../../../images/edit.png'
import historyImg from  '../../../images/history.png'
import deleteBtn from  '../../../images/deleteBtn.png'
import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import db from "../../../firebase";

function MySubCatPage({subcategories, setSubcategories, pages, setPages, pageContent, setPageContent, comments, setComments, history, setHistory, setVisible, currentUserID}) {
    const {subcategoryID} = useParams()

    const rootAreaClasses = [classes.description];
    const rootInputClasses = [classes.linkElement];
    const rootAddClasses = [classes.addBtn];
    const rootDeleteClasses = [classes.delBtn];

    const [editing, setEditing] = useState(true);
    let editBtn = '';

    if (editing) {
        rootAreaClasses.push(classes.active);
        rootInputClasses.push(classes.active);
        rootDeleteClasses.push(classes.active);
        rootAddClasses.push(classes.active);
        editBtn = 'Edit';
    } else {
        editBtn = 'Save'
    }

    function editPage() {
        if (currentUserID == 0) {
            setVisible(true)
            return;
        }
        setEditing(!editing);
    }

    function changePageDescription(event) {
        setSubcategories(
            subcategories?.map((page) => {
                if (page.subcategoryID == parseInt(subcategoryID)) {

                    const docRef = doc(db, 'subcategories', page.subcategoryID.toString());
                    const payload = {...page , pageDescription: event.target.value};
                    setDoc(docRef, payload);

                    return {...page , pageDescription: event.target.value};
                } else {
                    return page;
                }
            })
        );
    }
    
    function addPage() { //ооооооооооооооооочень важно, разделить на объекты
        setPages(
            [...pages, {pageId: setPageID(pages), pageName: 'Page name', subcategoryID: parseInt(subcategoryID), pageDescription: 'add description',}]
        )

        const pagedocRef = doc(db, 'pages', setPageID(pages).toString());
        const pagepayload = {pageId: setPageID(pages), pageName: 'Page name', 
                        subcategoryID: parseInt(subcategoryID), 
                        pageDescription: 'add description'};
        setDoc(pagedocRef, pagepayload);

        setPageContent(
            [...pageContent, {pageId: setPageID(pages), content: []}]
        )

        const pageContentdocRef = doc(db, 'pageContent', setPageID(pages).toString());
        const pageContentpayload = {pageId: setPageID(pages), content: []};
        setDoc(pageContentdocRef, pageContentpayload);

        setComments(
            [...comments, {pageId: setPageID(pages), pageComments: []}]
        )

        const commentsdocRef = doc(db, 'comments', setPageID(pages).toString());
        const commentspayload = {pageId: setPageID(pages), pageComments: []};
        setDoc(commentsdocRef, commentspayload);

        setHistory(
            [...history, {pageId: setPageID(pages), pageHistory: []}]
        )

        const historydocRef = doc(db, 'history', setPageID(pages).toString());
        const historypayload = {pageId: setPageID(pages), pageHistory: []};
        setDoc(historydocRef, historypayload);
    }

    function setPageID (pages) {
        if (pages.length > 0) {
            return pages.reduce((previous, current) => previous.pageId > current.pageId ? previous : current).pageId + 1;
        } else {
            return 1;
        }
    }

    function changePageName(event) { //какая-то проблема со страницами
        setPages(
            pages?.map((page) => {
                if (page.pageId == event.target.id) {

                    const docRef = doc(db, 'pages', page.pageId.toString());
                    const payload = {...page, pageName: event.target.value};
                    console.log(payload)
                    console.log(event.target.value)
                    setDoc(docRef, payload);

                    return {...page, pageName: event.target.value};
                } else {
                    return page;
                }
            })
        );
    }

    function editLink (editing, page) { //какая-то проблема со страницами
        if (editing) {
            return (
                <Link id={page.pageId} to={`/content/${page.pageId}`} className={classes.link}>
                    <h1 className={rootInputClasses.join(' ')} id={page.pageId}>
                        {page.pageName}
                    </h1>
                </Link>
            ) 
        } else {
                return (
                    <div style={{display: 'flex'}}>
                        <input className={classes.linkInput} onChange={changePageName} id={page.pageId} value={page.pageName}></input>
                        <div id={page.pageId} onClick={handleDelete} className={rootDeleteClasses.join(' ')} style={{height: '3px', cursor: 'pointer', margin: 0, marginBottom: 0, marginRight: '45px', marginTop: '3px', marginLeft: '30px' ,padding: 0, display: "flex"}}>
                            <img id={page.pageId} onClick={handleDelete} src={deleteBtn} width={24} height={24} alt="delete"/>
                            <h3 id={page.pageId} onClick={handleDelete} style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91', fontSize: '18px'}}>Delete</h3>
                        </div>
                    </div>
                )
            }
    }

    function handleDelete(event) { //добавить удаление
        setPages(
            pages?.filter(page => {
                return page.pageId != event.target.id;
            })
        )

        const pagesdocRef = doc(db, 'pages', event.target.id);
        deleteDoc(pagesdocRef);

        setComments(
            comments?.filter(page => {
                return page.pageId != event.target.id;
            })
        )

        const commentsdocRef = doc(db, 'comments', event.target.id);
        deleteDoc(commentsdocRef);

        setHistory(
            history?.filter(page => {
                return page.pageId != event.target.id;
            })
        )

        const historydocRef = doc(db, 'history', event.target.id);
        deleteDoc(historydocRef);

        setPageContent(
            pageContent?.filter(page => {
                return page.pageId != event.target.id;
            })
        )

        const pageContentdocRef = doc(db, 'pageContent', event.target.id);
        deleteDoc(pageContentdocRef);
    }

    return (
        <div className={classes.pageBlock}>
            <div className={classes.title}>
                    <h1 className={classes.pageH} style={{color: '#F34A91'}}>
                        {subcategories[subcategories?.findIndex(page => page.subcategoryID == subcategoryID)]?.subcategory}
                    </h1>
                    <div style={{margin: 0, padding: 0, marginRight: '30px', display: 'flex'}}>
                        <div onClick={editPage} style={{cursor: 'pointer', margin: 0, marginRight: '15px', padding: 0, display: "flex"}}>
                            <img onClick={editPage} src={edit} width={24} height={24} alt="edit"/>
                            <h3 onClick={editPage} style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>{editBtn}</h3>
                        </div>
                    </div>
            </div>                    
            <textarea disabled={editing} value={subcategories[subcategories?.findIndex(page => page.subcategoryID == subcategoryID)]?.pageDescription} onChange={changePageDescription} className={rootAreaClasses.join(' ')}></textarea>

            <div>
                <div className={classes.titleDiv}>
                    <h1 className={classes.linksTitle}>Links</h1>
                </div>
                <div className={classes.line}></div>
                <ul className={classes.linkList}>
                    {
                        pages.map(page => {
                            if (page.subcategoryID == parseInt(subcategoryID)){
                            return (
                                <li key={page.pageId} id={page.pageId}>
                                    {editLink(editing, page)}
                                </li>
                            )
                            }
                        })
                    }
                </ul>
                <button onClick={addPage} className={rootAddClasses.join(' ')}>Add page</button>
            </div>
        </div>
    )
}

export default MySubCatPage
