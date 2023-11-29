import React from "react";
import classes from "./MySubCatPage.module.css"
import edit from  '../../../images/edit.png'
import historyImg from  '../../../images/history.png'
import deleteBtn from  '../../../images/deleteBtn.png'
import { Link, useParams } from "react-router-dom"
import { useState } from "react";

function MySubCatPage({currentSubCat, subcategories, setSubcategories, pages, setPages, pageContent, setPageContent, comments, setComments, history, setHistory}) {
    const rootAreaClasses = [classes.description];
    const rootAddClasses = [classes.addBtn];

    const [editing, setEditing] = useState(true);
    let editBtn = '';

    if (editing) {
        rootAreaClasses.push(classes.active);
        rootAddClasses.push(classes.active);
        editBtn = 'Edit';
    } else {
        editBtn = 'Save'
    }

    function editPage() {
        setEditing(!editing);
    }

    function changePageDescription(event) {
        setSubcategories(
            subcategories.map((page) => {
                if (page.subcategory == (currentSubCat)) {
                    return {...page , pageDescription: event.target.value};
                } else {
                    return page;
                }
            })
        );
    }
    
    function addPage() {
        setPages(
            [...pages, {pageId: setPageID(pages), pageName: 'Page name', subcategory: currentSubCat, pageDescription: 'add description',}]
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
       return pages.reduce((previous, current) => previous.pageId > current.pageId ? previous : current).pageId + 1;
    }

    return (
        <div className={classes.pageBlock}>
            <div className={classes.title}>
                    <h1 className={classes.pageH} style={{color: '#F34A91'}}>
                        {subcategories[subcategories.findIndex(page => page.subcategory == currentSubCat)].subcategory}
                    </h1>
                    <div style={{margin: 0, padding: 0, marginRight: '30px', display: 'flex'}}>
                        <div onClick={editPage} style={{cursor: 'pointer', margin: 0, marginRight: '15px', padding: 0, display: "flex"}}>
                            <img onClick={editPage} src={edit} width={24} height={24} alt="edit"/>
                            <h3 onClick={editPage} style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>{editBtn}</h3>
                        </div>
                    </div>
            </div>                    
            <textarea disabled={editing} value={subcategories[subcategories.findIndex(page => page.subcategory == currentSubCat)].pageDescription} onChange={changePageDescription} className={rootAreaClasses.join(' ')}></textarea>

            <div>
                <div className={classes.titleDiv}>
                    <h1 className={classes.linksTitle}>Links</h1>
                </div>
                <div className={classes.line}></div>
                <ul className={classes.linkList}>
                    {
                        pages.map(page => {
                            if (page.subcategory == currentSubCat){
                            return (
                                <li key={page.pageId} id={page.pageId}>
                                    <Link id={page.pageId} to={`/content/${page.pageId}`} style={{cursor: 'pointer',textDecoration: 'none'}}>
                                        <h3 className={classes.linkElement} id={page.pageId}>
                                            {page.pageName}
                                        </h3>
                                    </Link>
                                </li>
                            )
                            }
                        })
                    }
                </ul>
                <button onClick={addPage} className={rootAddClasses.join(' ')}>Add paragraph</button>
            </div>
        </div>
    )
}

export default MySubCatPage
