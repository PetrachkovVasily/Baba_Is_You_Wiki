import React, { useState } from "react";
import classes from './MyContentBlock.module.css';
import edit from  '../../../images/edit.png';
import historyImg from  '../../../images/history.png';
import deleteBtn from  '../../../images/deleteBtn.png';
import { Link, useParams } from "react-router-dom";

function MyContentBlock({pages, setPages, paragraphs, setPageContent, categories, history, setHistory, visible, setVisible, currentUserID}) {
    const {id} = useParams();
    
    const WAS_ADDED = 'was added';
    const WAS_DELETED = 'was deleted';
    const WAS_CHANGED = 'was changed';
    const PARAGRAPH = 'paragraph';
    const TITLE = 'title';
    const DESCRIPTION = 'description';

    const rootAreaClasses = [classes.description];
    const rootInputClasses = [classes.pageP];
    const rootDeleteClasses = [classes.delBtn];
    const rootAddClasses = [classes.addBtn];
    const [editing, setEditing] = useState(true);
    let editBtn = '';
    let currentCategory = '';
    let currentSubCategory = '';
    let [currentChanges, setCurrentChanges] = useState([]);

    findCategory(categories);
    if (editing) {
        rootAreaClasses.push(classes.active);
        rootInputClasses.push(classes.active);
        rootDeleteClasses.push(classes.active);
        rootAddClasses.push(classes.active);
        editBtn = 'Edit';
    } else {
        editBtn = 'Save'
    }

    function findCategory(categories) {
        categories.forEach(item => {
            item.subcategories.forEach(subcat => {
                if (subcat.subcategoryID == pages[pages.findIndex(page => page.pageId == id)].subcategoryID) {
                    currentCategory = item;
                    currentSubCategory = subcat;
                }
            });
        });
    }

    function changePageDescription(event) {
        setPages(
            pages.map((page) => {
                if (page.pageId == (id)) {
                    //history changes
                    if (!currentChanges.includes(page.pageName + ' ' + DESCRIPTION + ' ' + WAS_CHANGED)) {
                        setCurrentChanges([...currentChanges, page.pageName + ' ' + DESCRIPTION + ' ' + WAS_CHANGED]);
                     }
                    return {...page , pageDescription: event.target.value};
                } else {
                    return page;
                }
            })
        );
    }

    function changeTextArea(event) {
        setPageContent(
            paragraphs.map((page) => {
                if (page.pageId == id) {
                    let currentContent = [...page.content];
                    currentContent.map((paragraph) => {
                        if (paragraph.paragraphID == event.target.id) {
                           paragraph.description = event.target.value; 
                           //history changes
                           if (!currentChanges.includes(paragraph.paragraphName + ' ' + DESCRIPTION + ' ' + WAS_CHANGED)) {
                              setCurrentChanges([...currentChanges, paragraph.paragraphName + ' ' + DESCRIPTION + ' ' + WAS_CHANGED]);
                           }
                        }
                    })
                    return {...page, content: currentContent}
                } else {
                    return page;
                }
            })  
        )
    }

    function changeHistory() {
        setHistory(
            history.map((page) => {
                if (page.pageId == id) {
                    let currentHistory = [...page.pageHistory];
                    currentHistory = [
                        ...currentHistory,
                        {userName: 'Stepa', dateOfChange: Date.now(), changes: currentChanges}
                    ]
                    return {...page, pageHistory: currentHistory}
                } else {
                    return page;
                }
            })
        );
    }

    function changeInput(event) {
        setPageContent(
            paragraphs.map((page) => {
                if (page.pageId == id) {
                    let currentContent = [...page.content];
                    currentContent.map((paragraph) => {
                        if (paragraph.paragraphID == event.target.id) {
                           paragraph.paragraphName = event.target.value; 
                           //history changes
                           if (!currentChanges.includes(paragraph.paragraphName + ' ' + TITLE + ' ' + WAS_CHANGED)) {
                            setCurrentChanges([...currentChanges, paragraph.paragraphName + ' ' + TITLE + ' ' + WAS_CHANGED]);
                           }
                        }
                    })
                    return {...page, content: currentContent}
                } else {
                    return page;
                }
            })  
        )
    }
    
    function editPage() {
        if (currentUserID == 0) {
            setVisible(true)
            return;
        }
        setEditing(!editing);
        if (editing == false) {
            changeHistory()
        }
    }


    function handleDelete(event) {
        setPageContent(
            paragraphs.map((page) => {
                if (page.pageId == id) {
                    let currentContent = [...page.content];
                    //history changes
                    if (!currentChanges.includes(page.content[page.content.findIndex(paragraph => paragraph.paragraphID == event.target.id)].paragraphName + ' ' + WAS_DELETED)) {
                        setCurrentChanges([...currentChanges, page.content[page.content.findIndex(paragraph => paragraph.paragraphID == event.target.id)].paragraphName + ' ' + WAS_DELETED]);
                        //pages[pages.findIndex(page => page.pageId == id)].pageDescription
                    }
                    currentContent = currentContent.filter((paragraph) => {
                       return paragraph.paragraphID != event.target.id;
                    });
                    return {...page, content: currentContent}
                } else {
                    return page;
                }
            })  
        )
    }

    function checkRaduce (currentContent) {
        if (currentContent.length > 0)
            return currentContent.reduce((previous, current) => previous.paragraphID > current.paragraphID ? previous : current).paragraphID + 1;
        else
            return 1;
    }

    function handleAdd(event) {
        setPageContent(
            paragraphs.map((page) => {
                if (page.pageId == id) {
                    let currentContent = [...page.content];
                    currentContent = [
                        ...currentContent, // reduse ломается при 0 элементов
                        {paragraphID: checkRaduce(currentContent),
                        paragraphName: 'Paragraph name', 
                        description: 'paragraph description'}
                    ];
                    //history changes
                    if (!currentChanges.includes(PARAGRAPH + ' ' + WAS_ADDED)) {
                        setCurrentChanges([...currentChanges, PARAGRAPH + ' ' + WAS_ADDED]); //изменить позже
                    }
                    return {...page, content: currentContent}
                } else {
                    return page;
                }
            })  
        )
    }

    return (
        <div className={classes.pageBlock}>
            <div id="pageTitle" className={classes.contentBlock}>
                <div className={classes.title}>
                    <h1 className={classes.pageH} style={{color: '#F34A91'}}>
                        {pages[pages.findIndex(page => page.pageId == id)].pageName}
                    </h1>
                    <div style={{margin: 0, padding: 0, marginRight: '30px', display: 'flex'}}>
                        <div onClick={editPage} style={{cursor: 'pointer', margin: 0, marginRight: '15px', padding: 0, display: "flex"}}>
                            <img src={edit} width={24} height={24} alt="edit"/>
                            <h3 style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>{editBtn}</h3>
                        </div>
                        <Link to={`/history/${id}`} style={{cursor: 'pointer',margin: 0, marginRight: '15px', padding: 0, display: "flex", textDecoration: 'none'}}>
                            <img src={historyImg} width={24} height={24} alt="history"/>
                            <h3 style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>History</h3>
                        </Link>
                    </div>
                    
                </div>
                
                <textarea disabled={editing} value={pages[pages.findIndex(page => page.pageId == id)].pageDescription} onChange={changePageDescription} className={rootAreaClasses.join(' ')}></textarea>
                {
                    paragraphs[pages.findIndex(page => page.pageId == id)].content.map((paragraph) => {
                        return (
                            <div style={{margin: 0, padding: 0}} key={paragraph.paragraphID}>
                                <div className={classes.title}>
                                    <input disabled={editing} id={paragraph.paragraphID} onChange={changeInput} className={rootInputClasses.join(' ')} value={paragraph.paragraphName}></input>
                                    <div id={paragraph.paragraphID} onClick={handleDelete} className={rootDeleteClasses.join(' ')} style={{cursor: 'pointer', margin: 0, marginBottom: 0, marginRight: '45px', marginTop: '30px' ,padding: 0, display: "flex"}}>
                                        <img id={paragraph.paragraphID} onClick={handleDelete} src={deleteBtn} width={24} height={24} alt="delete"/>
                                        <h3 id={paragraph.paragraphID} onClick={handleDelete} style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>Delete</h3>
                                    </div>
                                </div>
                                <div className={classes.line}></div>
                                <textarea disabled={editing} id={paragraph.paragraphID} onChange={changeTextArea} value={paragraph.description} className={rootAreaClasses.join(' ')}></textarea>
                            </div>
                        )
                    })
                }
                <button onClick={handleAdd} className={rootAddClasses.join(' ')}>Add paragraph</button>
                
                <h1 id="category" className={classes.pageH1}>Category</h1>
                <h4 className={classes.pageCat}>
                    {pages[pages.findIndex(page => page.pageId == id)].pageName}/{currentCategory.name}/{currentSubCategory.name}
                </h4>
            </div>
        </div>
    )
}

export default MyContentBlock
