import React from "react"
import classes from './MyContentBlock.module.css'

function MyContentBlock({children}) {
    return (
        <div className={classes.pageBlock}>
            <div className={classes.contentBlock}>
                <h1 className={classes.pageH} style={{color: '#F34A91'}}>
                    {'Page name'}
                </h1>
                <textarea className={classes.description} value={'asdfghjmjhgfdsf'}>
                </textarea>
                <h1 className={classes.pageP}>
                    {'Paragraph name'}
                </h1>
                <div className={classes.line}></div>
                <textarea className={classes.description} value={'asdfghjmjhgfdsf'}>
                </textarea>
                <h1 className={classes.pageH1}>Category</h1>
                <h4  className={classes.pageCat}>
                    {'Pagename/category/subcategory'}
                </h4>
            </div>
            {children}
        </div>
    )
}

export default MyContentBlock
