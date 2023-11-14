import React from "react"
import classes from './MyContentBlock.module.css'
import edit from  '../../../images/edit.png'
import history from  '../../../images/history.png'

function MyContentBlock({children, page, paragraphs, categories}) {
    let currentCetegory = '';
    findCategory(categories);
    console.log(currentCetegory)

    function findCategory(categories) {
        categories.forEach(item => {
            item.subcutegories.forEach(subcut => {
                if (subcut === page.subcutegory) {
                    currentCetegory = item.name;
                }
            });
        });
    }
    return (
        <div className={classes.pageBlock}>
            <div id="pageTitle" className={classes.contentBlock}>
                <div className={classes.title}>
                    <h1 className={classes.pageH} style={{color: '#F34A91'}}>
                        {page.pageName}
                    </h1>
                    <div style={{margin: 0, padding: 0, marginRight: '30px', display: 'flex'}}>
                        <div style={{margin: 0, marginRight: '15px', padding: 0, display: "flex"}}>
                            <img src={edit} width={24} height={24} alt="edit"/>
                            <h3 style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>Edit</h3>
                        </div>
                        <div style={{margin: 0, marginRight: '15px', padding: 0, display: "flex"}}>
                            <img src={history} width={24} height={24} alt="edit"/>
                            <h3 style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>History</h3>
                        </div>
                    </div>
                    
                </div>
                
                <textarea className={classes.description}>
                    {page.pageDescription}
                </textarea>
                {
                    paragraphs.map((item) => {
                        return (
                            <>
                                <h1 id={item.paragraphID} className={classes.pageP}>
                                    {item.paragraphName}
                                </h1>
                                <div className={classes.line}></div>
                                <textarea className={classes.description}>
                                    {item.description}
                                </textarea>
                            </>
                        )
                    })
                }
                
                <h1 id="category" className={classes.pageH1}>Category</h1>
                <h4 className={classes.pageCat}>
                    {page.pageName}/{currentCetegory}/{page.subcutegory}
                </h4>
            </div>
            {children}
        </div>
    )
}

export default MyContentBlock
