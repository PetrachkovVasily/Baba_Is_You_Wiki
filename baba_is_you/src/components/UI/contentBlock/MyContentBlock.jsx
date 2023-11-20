import React, { useState } from "react"
import classes from './MyContentBlock.module.css'
import edit from  '../../../images/edit.png'
import history from  '../../../images/history.png'
import deleteBtn from  '../../../images/deleteBtn.png'
import paragraphImg from  '../../../images/paragraphImg.png'

function MyContentBlock({children, currentID, pages, setPages, paragraphs, setPageContent, categories}) {

    const rootAreaClasses = [classes.description];
    const rootInputClasses = [classes.pageP];
    const rootDeleteClasses = [classes.delBtn];
    const rootAddClasses = [classes.addBtn];
    const [editing, setEditing] = useState(true);
    let editBtn = '';
    let currentCetegory = '';

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
            item.subcutegories.forEach(subcut => {
                if (subcut === pages[pages.findIndex(page => page.pageId == currentID)].subcutegory) {
                    currentCetegory = item.name;
                }
            });
        });
    }

    function changePageDescription(event) {
        setPages(
            pages.map((page) => {
                if (page.pageId === (currentID)) {
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
                if (page.pageId === currentID) {
                    let currentContent = [...page.content];
                    currentContent.map((paragraph) => {
                        if (paragraph.paragraphID == event.target.id) {
                           paragraph.description = event.target.value; 
                        }
                    })
                    return {...page, content: currentContent}
                } else {
                    return page;
                }
            })  
        )
    }

    function changeInput(event) {
        setPageContent(
            paragraphs.map((page) => {
                if (page.pageId === currentID) {
                    let currentContent = [...page.content];
                    currentContent.map((paragraph) => {
                        if (paragraph.paragraphID == event.target.id) {
                           paragraph.paragraphName = event.target.value; 
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
        setEditing(!editing);
    }

    function handleDelete(event) {
        setPageContent(
            paragraphs.map((page) => {
                if (page.pageId === currentID) {
                    let currentContent = [...page.content];
                    console.log()
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

    function handleAdd(event) {
        setPageContent(
            paragraphs.map((page) => {
                if (page.pageId === currentID) {
                    let currentContent = [...page.content];
                    currentContent = [
                        ...currentContent,
                        {paragraphID: currentContent.reduce((previous, current) => previous.paragraphID > current.paragraphID ? previous : current).paragraphID + 1, paragraphName: 'Paragraph name', description: 'paragraph description'}
                    ];
                    return {...page, content: currentContent}
                } else {
                    return page;
                }
            })  
        )
    }

    //console.log(paragraphs[0].content)
    return (
        <div className={classes.pageBlock}>
            <div id="pageTitle" className={classes.contentBlock}>
                <div className={classes.title}>
                    <h1 className={classes.pageH} style={{color: '#F34A91'}}>
                        {pages[pages.findIndex(page => page.pageId == currentID)].pageName}
                    </h1>
                    <div style={{margin: 0, padding: 0, marginRight: '30px', display: 'flex'}}>
                        <div onClick={editPage} style={{cursor: 'pointer', margin: 0, marginRight: '15px', padding: 0, display: "flex"}}>
                            <img src={edit} width={24} height={24} alt="edit"/>
                            <h3 style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>{editBtn}</h3>
                        </div>
                        <div style={{cursor: 'pointer',margin: 0, marginRight: '15px', padding: 0, display: "flex"}}>
                            <img src={history} width={24} height={24} alt="history"/>
                            <h3 style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>History</h3>
                        </div>
                    </div>
                    
                </div>
                
                <textarea disabled={editing} value={pages[pages.findIndex(page => page.pageId == currentID)].pageDescription} onChange={changePageDescription} className={rootAreaClasses.join(' ')}></textarea>
                {
                    paragraphs[pages.findIndex(page => page.pageId == currentID)].content.map((paragraph) => {
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
                    {pages[pages.findIndex(page => page.pageId == currentID)].pageName}/{currentCetegory}/{pages[pages.findIndex(page => page.pageId == currentID)].subcutegory}
                </h4>
            </div>
            {children}
        </div>
    )
}

export default MyContentBlock
