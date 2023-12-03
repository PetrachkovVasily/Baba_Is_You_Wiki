import React, { useState, useEffect } from "react";
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

function App() {
  const [currentUserID, setCurrentUserID] = useState(0)

  const [users, setUsers] = useState([
    {userId: 1, isAuth: false, isBlocked: false, userName: 'Stepa', password: 'jopa', pages: []},
  ])

  const [admins, setAdmins] = useState([
    {adminId: 1, adminName: 'Vasya', password: 'qwerty', blockedUsers: []},
  ])
  
  const [categories, setCategory] = useState([
    {categoryID: 1, name: 'category 3', subcategories: [
      {name: '32w2', subcategoryID: 32},
      {name: 'sdsdsdsd', subcategoryID: 33},
    ]},
  ])

  const [subcategories, setSubcategories] = useState([
    {subcategoryID: 32, subcategory: '32w2', pageDescription: 'Sub cut description 32'},
    {subcategoryID: 33, subcategory: 'sdsdsdsd', pageDescription: 'Sub cut description 32'},
  ])

  const [pages , setPages] = useState([
    {pageId: 1, pageName: 'Name 1', subcategoryID: 32, pageDescription: 'description 1',},
    {pageId: 2, pageName: 'Name 2', subcategoryID: 33, pageDescription: 'description 2',},
  ])

  const [pageContent, setPageContent] = useState([
    {pageId: 1, content: [
      {paragraphID: 1, paragraphName: 'p 1', description: 'description 1'},
      {paragraphID: 2, paragraphName: 'p 2', description: '...'},
      {paragraphID: 3, paragraphName: 'p 3', description: 'description 1'},
      {paragraphID: 4, paragraphName: 'p 4', description: 'description 3'},
    ]},
    {pageId: 2, content: [
      {paragraphID: 1, paragraphName: 'p 1', description: 'description 2'},
      {paragraphID: 2, paragraphName: 'p 2', description: ''},
      {paragraphID: 3, paragraphName: 'p 3', description: 'description 2'},
    ]},
  ])

  const [comments, setComments] = useState([
    {pageId: 1, pageComments: [
      {userName: 'Current user', commentDate: Date.now(), commentText: 'text 1'},
      {userName: 'other Current user', commentDate: Date.now(), commentText: 'text 2'},
      {userName: 'other other Current user', commentDate: Date.now(), commentText: 'text 3'},
    ]},
    {pageId: 2, pageComments: [
      {userName: 'other Current user', commentDate: new Date(), commentText: 'text 4'},
    ]},
  ])

  const [history, setHistory] = useState([
    {pageId: 1, pageHistory: [
        {userName: 'Current user', dateOfChange: Date.now(), changes: [
              'Blablabla paragraph was added',
              'Blablabla paragraph was deleted',
              'Blablabla paragraph description was changed',
              'Blablabla paragraph name was changed',
        ]},
        {userName: 'other Current user', dateOfChange: Date.now(), changes: [
          'Blablabla paragraph was added',
          'Blablabla paragraph name was changed',
        ]},
    ]},
  ])

  const [inputBody, setInputBody] = useState('');

  function handleSearch(event) {
    setInputBody('');
  }

  const [isOpen, setIsOpen] = useState([]);

  const [visible, setVisible] = useState(false);

  let [switcher, setSwitcher] = useState(true);

  
  useEffect(() => {
    setIsOpen([...categories.map(cat => {
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
        <MyHeader>
          <div className={classes.catMenu}>
            {
                isOpen.map((cat) => {
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
                      <MyListMenu id={cat.categoryID} isOpen={cat.open} setIsOpen={setIsOpen} category={categories[categories.findIndex(category => category.categoryID == cat.categoryID)]}/>
                      </div>
                    )
                })
            }
          </div>

          <MyInput 
            value={inputBody} 
            onChange={event => setInputBody(event.target.value)} 
            type='text' 
            placeholder='Search'/>
            <img onClick={handleSearch} src="https://www.svgrepo.com/show/493720/search-magnify-magnifier-glass.svg" alt="search" height={36} width={30} className={classes.searchImg}/>
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
                  <MyHistory history={history} pages={pages} />
                </>
                }/>
              <Route path="content/:id" element={
                <>
                  <MyNavbar 
                  pages={pages} setPages={setPages} 
                  paragraphs={pageContent} 
                  users={users} setUsers={setUsers} 
                  currentUserID={currentUserID}
                  visible={visible} setVisible={setVisible}/>
                  <MyContentBlock 
                  currentUserID={currentUserID}
                  pages={pages} setPages={setPages} 
                  paragraphs={pageContent} setPageContent={setPageContent} 
                  categories={categories} 
                  history={history} setHistory={setHistory}
                  visible={visible} setVisible={setVisible}/>
                  <MyCommentBlock 
                  currentUserID={currentUserID}
                  comments={comments} setComments={setComments}
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
