import React, { useState } from "react"
import classes from "./MyHomePage.module.css"
import { Link } from "react-router-dom";
import edit from  '../../../images/edit.png'
import deleteBtn from  '../../../images/deleteBtn.png';

function MyHomePage({isOpen, setIsOpen, categories, setCategory, subcategories, setSubcategories, setVisible, currentUserID}) {

    const rootInputClasses = [classes.linkElement];
    const rootCategoryClasses = [classes.categoryTitle];
    const rootDeleteClasses = [classes.delBtn];
    const rootAddClasses = [classes.addBtn];

    const [editing, setEditing] = useState(true);
    let editBtn = '';

    if (editing) {
        rootDeleteClasses.push(classes.active);
        rootCategoryClasses.push(classes.active);
        rootAddClasses.push(classes.active);
        editBtn = 'Edit';
    } else {
        editBtn = 'Save'
    }

    function editPage() {
        if (currentUserID == 0) {
            setVisible(true)
            return;
        }
        setEditing(!editing);
    }

    function editLink (editing, subcategory) {
        if (editing) {
            return (
                <Link id={subcategory} to={`/subcategory/${subcategory}`} className={classes.link}>
                    <h1 className={rootInputClasses.join(' ')} id={subcategory}>
                        {subcategories[subcategories.findIndex(subcat => subcat.subcategoryID == subcategory)]?.subcategory}
                    </h1>
                </Link>
            ) 
        } else {
                return (
                    <input className={classes.linkInput} onChange={changeSubcutegoryName} id={subcategory} value={subcategories[subcategories.findIndex(subcat => subcat.subcategoryID == subcategory)]?.subcategory}></input>
                )
            }
    }
    
    function changeSubcutegoryName(event) {
        const currentName = event.target.value;
        setSubcategories(
            subcategories.map((subcat) => {
                if (subcat.subcategoryID == (event.target.id)) {
                    return {...subcat , subcategory: currentName};
                } else {
                    return subcat;
                }
            })
        );
    }

    function addCategory(event) {
        setCategory(
            [...categories,
            {categoryID: setCategoryID(categories), name: 'Category name', subcategories: []}]
        )
    }

    function addSubcategory(event) {
        setSubcategories([
            ...subcategories,
            {subcategoryID: setSubcategoryID(subcategories), subcategory: 'subcategory name', pageDescription: 'Subcategory description'}
        ])
        setCategory(
            categories.map(category => {
                if (category.categoryID == event.target.id) {
                    let current = [...category.subcategories];
                    current = [
                        ...current,
                        setSubcategoryID(subcategories)
                    ]
                    return {...category, subcategories: current}
                } else {
                    return category;
                }
            })
        )
    }

    function setCategoryID (categories) {
        if (categories.length > 0) {
            return categories.reduce((previous, current) => previous.categoryID > current.categoryID ? previous : current).categoryID + 1;
        } else {
            return 1;
        }
     }

    function setSubcategoryID (subcategories) {
        if (subcategories.length > 0) {
            return subcategories.reduce((previous, current) => previous.subcategoryID > current.subcategoryID ? previous : current).subcategoryID + 1;
        } else {
            return 1;
        }
     }

    function changeCategoryName(event) {
        setCategory(
            categories.map(cat => {
                if (cat.categoryID == event.target.id) {
                    return {...cat, name: event.target.value}
                } else {
                    return cat;
                }
            })
        )
        setIsOpen(
            isOpen.map(cat => {
                if (cat.categoryID == event.target.id) {
                    return {...cat, name: event.target.value}
                } else {
                    return cat;
                }
            })
        )
    }

    function handleDelete(event) {
        
    }
    return (
        <div className={classes.pageBlock}>
            <div style={{margin: 0, padding: 0, marginRight: '30px', display: 'flex', justifyContent: "space-between"}}>
                <h1 className={classes.pageTitle}>Categories</h1>
                <div style={{margin: 0, padding: 0, marginRight: '30px', display: 'flex'}}>
                    <div onClick={editPage} style={{cursor: 'pointer', margin: 0, marginRight: '15px', padding: 0, display: "flex"}}>
                        <img onClick={editPage} src={edit} width={24} height={24} alt="edit"/>
                        <h3 onClick={editPage} style={{margin: 0, marginLeft: '5px', marginTop: '3px', color: '#F34A91'}}>{editBtn}</h3>
                    </div>
                </div>
            </div>
            {
                categories.map((category) => {
                    return (
                        <>
                            <div  id={category.categoryID} key={category.categoryID}>
                                <div className={classes.titleDiv}>
                                    <input id={category.categoryID} onChange={changeCategoryName} value={category.name} className={rootCategoryClasses.join(' ')}></input>
                                </div>
                                <div className={classes.line}></div>
                                <ul id={category.categoryID} className={classes.categoryList}>
                                    {
                                        category.subcategories.map(subcategory => {
                                            return (
                                                <li key={subcategory} id={subcategory} className={classes.subcatElement}>{editLink(editing, subcategory)}</li>
                                            )
                                        })
                                    }
                                    <button id={category.categoryID} onClick={addSubcategory} className={rootAddClasses.join(' ')} style={{marginTop: '15px', marginBottom: '15px', width: '180px', height: '30px', paddingTop: '5px', fontSize: '16px'}}>Add subcategory</button>
                                </ul>
                            </div>
                        </>
                    )
                })
            }
            <button onClick={addCategory} className={rootAddClasses.join(' ')}>Add category</button>
        </div>
    )
}

export default MyHomePage
