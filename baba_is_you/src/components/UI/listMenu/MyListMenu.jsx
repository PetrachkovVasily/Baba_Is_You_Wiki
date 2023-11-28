import React from "react"
import classes from './MyListMenu.module.css'

function MyListMenu({isOpen, category, setIsOpen}) {

    const rootClasses = [classes.menuList];

    if (isOpen) {
        rootClasses.push(classes.active);
    } 

    return (
        <ul className={rootClasses.join(' ')}>
            {category.subcategories.map((item) => {
                return <li className={classes.myLi}>{item}</li>
            })}
        </ul>
    )
}

export default MyListMenu
