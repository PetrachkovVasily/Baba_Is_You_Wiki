import React, { useState } from "react"
import classes from "./MyHomePage.module.css"
import { Link } from "react-router-dom";
import edit from  '../../../images/edit.png'
import deleteBtn from  '../../../images/deleteBtn.png';
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import db from "../../../firebase";


function MyHomePage({wiki, setWiki, isOpen, setIsOpen, categories, setCategory, subcategories, setSubcategories, setVisible, currentUserID}) {

    const rootInputClasses = [classes.linkElement];
    const rootCategoryClasses = [classes.categoryTitle];
    const rootDeleteClasses = [classes.delBtn];
    const rootAddClasses = [classes.addBtn];
    const rootAreaClasses = [classes.description];
    const rootWikiClasses = [classes.wiki];

    const [editing, setEditing] = useState(true);
    let editBtn = '';

    if (editing) {
        rootDeleteClasses.push(classes.active);
        rootInputClasses.push(classes.active);
        rootCategoryClasses.push(classes.active);
        rootAddClasses.push(classes.active);
        rootAreaClasses.push(classes.active);
        rootWikiClasses.push(classes.active);
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

                    const docRef = doc(db, 'subcategories', subcat.subcategoryID.toString());
                    const payload = {...subcat, subcategory: currentName};
                    setDoc(docRef, payload);

                    return {...subcat , subcategory: currentName};
                } else {
                    return subcat;
                }
            })
        );
    }

    function addCategory(event) {
        const newCatId = setCategoryID(categories);
        setCategory(
            [...categories,
            {categoryID: newCatId, name: 'Category name', subcategories: []}]
        )

        const docRef = doc(db, 'categories', newCatId.toString());
        const payload = {categoryID: newCatId, name: 'Category name', subcategories: []};
        setDoc(docRef, payload);
    }

    function addSubcategory(event) {
        const newSubcatId = setSubcategoryID(subcategories);
        setSubcategories([
            ...subcategories,
            {subcategoryID: newSubcatId, subcategory: 'subcategory name', pageDescription: 'Subcategory description'}
        ])

        const docRef = doc(db, 'subcategories', newSubcatId.toString());
        const payload = {subcategoryID: newSubcatId, subcategory: 'subcategory name', pageDescription: 'Subcategory description'};
        setDoc(docRef, payload);
        
        setCategory(
            categories.map(category => {
                if (category.categoryID == event.target.id) {
                    let current = [...category.subcategories];
                    current = [
                        ...current,
                        newSubcatId
                    ]

                    const docRef = doc(db, 'categories', category.categoryID.toString());
                    const payload = {...category, subcategories: current};
                    setDoc(docRef, payload);

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

                    const docRef = doc(db, 'categories', cat.categoryID.toString());
                    const payload = {...cat, name: event.target.value};
                    setDoc(docRef, payload);

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

    function deleteCategory(event) {
        setCategory(
            categories?.filter(category => {
                return category.categoryID != event.target.id;
            })
        )

        const categoriesdocRef = doc(db, 'categories', event.target.id);
        deleteDoc(categoriesdocRef);

        setIsOpen(
            isOpen?.filter(category => {
                return category.categoryID != event.target.id;
            })
        )
    }

    function deleteSubategory(event) {
        setSubcategories(
            subcategories?.filter(subcategory => {
                return subcategory.subcategoryID != event.target.id;
            })
        )

        // const subcategoriesdocRef = doc(db, 'subcategories', event.target.id);
        // deleteDoc(subcategoriesdocRef);

        setCategory(
            categories?.map((category) => {
                if (category.subcategories.includes(parseInt(event.target.id))) {
                    const currentSub = category.subcategories.filter(subcategory => {
                        return subcategory != event.target.id;
                    })

                    const docRef = doc(db, 'categories', category.categoryID.toString());
                    const payload = {...category, subcategories: currentSub};
                    setDoc(docRef, payload);
                    
                    return {...category, subcategories: currentSub}
                } else {
                    return category;
                }
            })
        )

    }

    function changeWikiName (event) {
        setWiki(
            [{wikiName: event.target.value, wikiDescription: wiki[0]?.wikiDescription}]
        )
        const docRef = doc(db, 'wiki', 'SgpGtK3o5urDcedDPFta');
        const payload = {wikiName: event.target.value, wikiDescription: wiki[0]?.wikiDescription};
        setDoc(docRef, payload);
    }

    function changePageDescription(event) {
        setWiki(
            [{wikiName: wiki[0]?.wikiName, wikiDescription: event.target.value}]
        )
        const docRef = doc(db, 'wiki', 'SgpGtK3o5urDcedDPFta');
        const payload = {wikiName: wiki[0]?.wikiName, wikiDescription: event.target.value};
        setDoc(docRef, payload);
    }
    
    return (
        <div className={classes.pageBlock}>
            <div style={{textAlign: 'center'}}>
                <input onChange={changeWikiName} disabled={editing} value={wiki[0]?.wikiName} className={rootWikiClasses.join(' ')}/>
                <textarea disabled={editing} 
                value={wiki[0]?.wikiDescription} 
                onChange={changePageDescription} className={rootAreaClasses.join(' ')}>
                </textarea>
            </div>
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
                            <div id={category.categoryID} key={category.categoryID}>
                                <div className={classes.titleDiv}>
                                    <input disabled={editing} id={category.categoryID} onChange={changeCategoryName} value={category.name} className={rootCategoryClasses.join(' ')}></input>
                                    <div id={category.categoryID} onClick={deleteCategory} className={rootDeleteClasses.join(' ')} style={{height: '3px', cursor: 'pointer', margin: 0, marginBottom: 0, marginRight: '45px', marginTop: '5px', marginLeft: '30px' ,padding: 0, display: "flex"}}>
                                        <img id={category.categoryID} onClick={deleteCategory} src={deleteBtn} width={24} height={24} alt="delete"/>
                                        <h3 id={category.categoryID} onClick={deleteCategory} style={{margin: 0, marginLeft: '5px', marginTop: '5px', color: '#F34A91', fontSize: '18px'}}>Delete</h3>
                                    </div>
                                </div>
                                <div className={classes.line}></div>
                                <ul id={category.categoryID} className={classes.categoryList}>
                                    {
                                        category.subcategories.map(subcategory => {
                                            return (
                                                <div key={subcategory} style={{display: 'flex'}}>
                                                    <li key={subcategory} id={subcategory} className={classes.subcatElement}>{editLink(editing, subcategory)}</li>
                                                    <div id={subcategory} onClick={deleteSubategory} className={rootDeleteClasses.join(' ')} style={{height: '3px', cursor: 'pointer', margin: 0, marginBottom: 0, marginRight: '45px', marginTop: '5px', marginLeft: '30px' ,padding: 0, display: "flex"}}>
                                                        <img id={subcategory} onClick={deleteSubategory} src={deleteBtn} width={24} height={24} alt="delete"/>
                                                        <h3 id={subcategory} onClick={deleteSubategory} style={{margin: 0, marginLeft: '5px', marginTop: '5px', color: '#F34A91', fontSize: '18px'}}>Delete</h3>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <button id={category.categoryID} onClick={addSubcategory} className={rootAddClasses.join(' ')} style={{marginTop: '15px', marginBottom: '15px', width: '180px', height: '30px', paddingTop: '5px', fontSize: '16px'}}>Add subcategory</button>
                                </ul>
                            </div>
                    )
                })
            }
            <button onClick={addCategory} className={rootAddClasses.join(' ')}>Add category</button>
        </div>
    )
}

export default MyHomePage
