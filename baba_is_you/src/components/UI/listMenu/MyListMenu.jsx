import React from "react"
import classes from './MyListMenu.module.css'
import { Link } from "react-router-dom";

function MyListMenu({isOpen, category, setIsOpen, subcategories}) {

    const rootClasses = [classes.menuList];

    if (isOpen) {
        rootClasses.push(classes.active);
    } 

    
    return (
        <ul className={rootClasses.join(' ')}>
            {category.subcategories.map((item) => {
                return <Link to={`/subcategory/${item}`} key={item} className={classes.myLi}>{subcategories[subcategories.findIndex(subcat => subcat.subcategoryID == item)]?.subcategory}</Link>
            })}
        </ul>
    )
}

export default MyListMenu
