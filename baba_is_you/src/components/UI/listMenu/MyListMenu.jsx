import React from "react"
import classes from './MyListMenu.module.css'
import { Link } from "react-router-dom";

function MyListMenu({isOpen, category, setIsOpen}) {

    const rootClasses = [classes.menuList];

    if (isOpen) {
        rootClasses.push(classes.active);
    } 

    
    return (
        <ul className={rootClasses.join(' ')}>
            {category.subcategories.map((item) => {
                console.log(category)
                return <Link to={`/subcategory/${item.subcategoryID}`} key={item.subcategoryID} className={classes.myLi}>{item.name}</Link>
            })}
        </ul>
    )
}

export default MyListMenu
