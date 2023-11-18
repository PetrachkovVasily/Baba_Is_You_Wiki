import React, { useState } from "react"
import classes from './MyContentBlock.module.css'
import edit from  '../../../images/edit.png'
import history from  '../../../images/history.png'

function MyContentBlock({children, pages, setPages, paragraphs, setPageContent, categories}) {

    const rootAreaClasses = [classes.description];
    const rootInputClasses = [classes.pageP];
    const [editing, setEditing] = useState(true);
    let editBtn = '';
    let currentID = 1;
    let currentCetegory = '';

    findCategory(categories);
    if (editing) {
        rootAreaClasses.push(classes.active);
        rootInputClasses.push(classes.active);
        editBtn = 'Edit';
    } else {
        editBtn = 'Save'
    }

    function findCategory(categories) {
        categories.forEach(item => {
            item.subcutegories.forEach(subcut => {
                if (subcut === pages[currentID].subcutegory) {
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

    
    function editPage() {
        setEditing(!editing);
    }

    return (
        <div className={classes.pageBlock}>
            <div id="pageTitle" className={classes.contentBlock}>
                <div className={classes.title}>
                    <h1 className={classes.pageH} style={{color: '#F34A91'}}>
                        {pages[currentID-1].pageName}
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
                
                <textarea disabled={editing} value={pages[currentID-1].pageDescription} onChange={changePageDescription} className={rootAreaClasses.join(' ')}></textarea>
                {
                    paragraphs[currentID-1].content.map((paragraph) => {
                        return (
                            <div style={{margin: 0, padding: 0}} key={paragraph.paragraphID}>
                                <input className={rootInputClasses.join(' ')} value={paragraph.paragraphName}></input>
                                <div className={classes.line}></div>
                                <textarea disabled={editing} id={paragraph.paragraphID} onChange={changeTextArea} value={paragraph.description} className={rootAreaClasses.join(' ')}></textarea>
                            </div>
                        )
                    })
                }
                
                <h1 id="category" className={classes.pageH1}>Category</h1>
                <h4 className={classes.pageCat}>
                    {pages[currentID-1].pageName}/{currentCetegory}/{pages[currentID-1].subcutegory}
                </h4>
            </div>
            {children}
        </div>
    )
}

export default MyContentBlock
