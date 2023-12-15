import React, { useState, useEffect, useContext } from "react";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MyHeader from "./components/UI/header/MyHeader";
import MyListMenu from "./components/UI/listMenu/MyListMenu";
import classes from './App.module.css'
import MyModal from "./components/UI/modal/MyModal";
import MyForm from "./components/UI/form/MyForm";
import MyNavbar from "./components/UI/navbar/MyNavbar";
import MyContentBlock from "./components/UI/contentBlock/MyContentBlock";
import MyCommentBlock from "./components/UI/commentBlock/MyCommentBlock";
import MyHistory from "./components/UI/history/MyHistory";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MyHomePage from "./components/UI/homePage/MyHomePage";
import MySubCatPage from "./components/UI/subCatPage/MySubCatPage";
import MyUserPage from "./components/UI/userPage/MyUserPage";

import db from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

function App() {

  const [currentUserID, setCurrentUserID] = useState(0)

  const [users, setUsers] = useState([])
  
  const [categories, setCategory] = useState([])

  const [subcategories, setSubcategories] = useState([])

  const [pages , setPages] = useState([])

  const [content, setContent] = useState([])

  const [pageContent, setPageContent] = useState([])

  const [comments, setComments] = useState([])

  const [pageComments, setPageComments] = useState([])

  const [history, setHistory] = useState([])

  const [pageHistory, setPageHistory] = useState([])

  const [wiki, setWiki] = useState([])

  useEffect(() => {
    onSnapshot(collection(db, "wiki"), (snapshot) => {
      setWiki(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "pageHistory"), (snapshot) => {
      setPageHistory(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "history"), (snapshot) => {
      setHistory(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "pageComments"), (snapshot) => {
      setPageComments(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "comments"), (snapshot) => {
      setComments(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "content"), (snapshot) => {
      setContent(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "pageContent"), (snapshot) => {
      setPageContent(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategory(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "subcategories"), (snapshot) => {
      setSubcategories(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map(doc => doc.data()))
    });
    onSnapshot(collection(db, "pages"), (snapshot) => {
      setPages(snapshot.docs.map(doc => doc.data()))
    });
    }, [])

  const [inputBody, setInputBody] = useState('');

  function handleSearch(event) {
    setInputBody('');
  }

  const [isOpen, setIsOpen] = useState([]);

  const [visible, setVisible] = useState(false);

  let [switcher, setSwitcher] = useState(true);
  
  useEffect(() => {
    setIsOpen([...categories?.map(cat => {
      return {categoryID: cat.categoryID, name: cat.name, open: true}
    })])
  }, [categories])

  return (
  <BrowserRouter>
    <div className="App">
      <div className={classes.backImg}></div>
      <div className={classes.bk}>
        <MyModal visible={visible} setVisible={setVisible}>
          <MyForm visible={visible} setVisible={setVisible} switcher={switcher} setSwitcher={setSwitcher} users={users} setUsers={setUsers} currentUserID={currentUserID} setCurrentUserID={setCurrentUserID}/>
        </MyModal>
        <MyHeader wikiName={wiki[0]?.wikiName}>
          <div className={classes.catMenu}>
            {
                isOpen?.map((cat) => {
                    return (
                      <div key={cat.categoryID}>
                      <MyButton id={cat.categoryID} onClick={(e) => {
                        setIsOpen(
                          isOpen.map(cat => {
                            if (cat.categoryID == e.target.id) {
                              return {...cat, open: !cat.open}
                            } else {
                              return cat;
                            }
                          })
                        );
                        e.target.nextSibling.style.left = e.target.offsetLeft + 'px';
                        }}>
                        {cat.name}
                      </MyButton>
                      <MyListMenu subcategories={subcategories} id={cat.categoryID} isOpen={cat.open} setIsOpen={setIsOpen} category={categories[categories?.findIndex(category => category.categoryID == cat.categoryID)]}/>
                      </div>
                    )
                })
            }
          </div>
          {
            currentUserID == 0 ? (
                <img onClick={() => {
                  setVisible(!visible);
                }} src="https://www.svgrepo.com/show/453446/account.svg" height={50} width={50} alt="acc img" className={classes.accImg}/>
            ) : (
              <Link to='user/'>
                <img src="https://www.svgrepo.com/show/453446/account.svg" height={50} width={50} alt="acc img" className={classes.accImg}/>
              </Link>
            )
          }
        </MyHeader>

        <div className={classes.pageBlock}>
          
            <Routes>
              <Route path="/" element={
                <MyHomePage 
                wiki={wiki} setWiki={setWiki}
                visible={visible} setVisible={setVisible}
                isOpen={isOpen} setIsOpen={setIsOpen} 
                categories={categories} setCategory={setCategory} 
                subcategories={subcategories} setSubcategories={setSubcategories}
                currentUserID={currentUserID}/>}/>
              <Route path="subcategory/:subcategoryID" element={
                <>
                  <MySubCatPage
                  visible={visible} setVisible={setVisible}
                  setSubcategories={setSubcategories} 
                  subcategories={subcategories} 
                  pages={pages} setPages={setPages} 
                  pageContent={pageContent} setPageContent={setPageContent}
                  comments={comments} setComments={setComments}
                  history={history} setHistory={setHistory}
                  currentUserID={currentUserID}/>
                </>
                }/>
              <Route path="history/:id" element={
                <>
                  <MyHistory pageHistory={pageHistory} setPageHistory={setPageHistory} history={history} pages={pages} />
                </>
                }/>
              <Route path="content/:id" element={
                <>
                  <MyNavbar 
                  pages={pages} setPages={setPages} 
                  paragraphs={pageContent} 
                  content={content} setContent={setContent}
                  users={users} setUsers={setUsers} 
                  currentUserID={currentUserID}
                  visible={visible} setVisible={setVisible}/>
                  <MyContentBlock 
                  subcategories={subcategories}
                  users={users}
                  currentUserID={currentUserID}
                  pages={pages} setPages={setPages} 
                  content={content} setContent={setContent}
                  paragraphs={pageContent} setPageContent={setPageContent} 
                  categories={categories} 
                  history={history} setHistory={setHistory}
                  pageHistory={pageHistory} setPageHistory={setPageHistory}
                  visible={visible} setVisible={setVisible}/>
                  <MyCommentBlock 
                  currentUserID={currentUserID}
                  pageComments={pageComments} setPageComments={setPageComments}
                  comments={comments} setComments={setComments}
                  users={users} setUsers={setUsers} 
                  visible={visible} setVisible={setVisible}/>
                </>
              }/>
              <Route path="user/" element={
                <>
                  <MyUserPage setCurrentUserID={setCurrentUserID} users={users} setUsers={setUsers} currentUserID={currentUserID} pages={pages}/>
                </>
              }/>
            </Routes>
          
          
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
