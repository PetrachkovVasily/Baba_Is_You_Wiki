import React from "react";
import classes from "./MySubCatPage.module.css"
import edit from  '../../../images/edit.png'
import historyImg from  '../../../images/history.png'
import deleteBtn from  '../../../images/deleteBtn.png'
import { Link, useParams } from "react-router-dom"
import { useState } from "react";

function MySubCatPage({subcategories, setSubcategories, pages, setPages, pageContent, setPageContent, comments, setComments, history, setHistory, setVisible, currentUserID}) {
    const {subcategoryID} = useParams()

    const rootAreaClasses = [classes.description];
    const rootInputClasses = [classes.linkElement];
    const rootAddClasses = [classes.addBtn];

    const [editing, setEditing] = useState(true);
    let editBtn = '';

    if (editing) {
        rootAreaClasses.push(classes.active);
        rootInputClasses.push(classes.active);
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
                if (page.subcategoryID == (subcategoryID)) {
                    return {...page , pageDescription: event.target.value};
                } else {
                    return page;
                }
            })
        );
    }
    
    function addPage() { //ооооооооооооооооочень важно, разделить на объекты
        setPages(
            [...pages, {pageId: setPageID(pages), pageName: 'Page name', subcategoryID: subcategoryID, pageDescription: 'add description',}]
        )
        setPageContent(
            [...pageContent, {pageId: setPageID(pages), content: []}]
        )
        setComments(
            [...comments, {pageId: setPageID(pages), pageComments: []}]
        )
        setHistory(
            [...history, {pageId: setPageID(pages), pageHistory: []}]
        )
    }

    function setPageID (pages) {
        if (pages.length > 0) {
            return pages.reduce((previous, current) => previous.pageId > current.pageId ? previous : current).pageId + 1;
        } else {
            return 1;
        }
    }

    function changePageName(event) {
        setPages(
            pages.map((page) => {
                if (page.pageId == (event.target.id)) {
                    return {...page , pageName: event.target.value};
                } else {
                    return page;
                }
            })
        );
    }

    function editLink (editing, page) {
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
                    <input className={classes.linkInput} onChange={changePageName} id={page.pageId} value={page.pageName}></input>
                )
            }
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
                            if (page.subcategoryID == subcategoryID){
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
