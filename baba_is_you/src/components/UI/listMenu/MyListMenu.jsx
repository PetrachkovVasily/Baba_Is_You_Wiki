import React from "react"
import classes from './MyListMenu.module.css'

function MyListMenu({isOpen, leftPosition, category}) {
    const rootClasses = [classes.menuList];
    if (isOpen) {
        rootClasses.push(classes.active);
    } 
    return (
        <ul className={rootClasses.join(' ')}>
            {category.subcutegories.map((item) => {
                return <li className={classes.myLi}>{item}</li>
            })}
        </ul>
    )
}

export default MyListMenu
