import React, { useRef, useState } from "react";
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
import MyComment from "./components/UI/comment/MyComment";
import MyHistory from "./components/UI/history/MyHistory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHomePage from "./components/UI/homePage/MyHomePage";
import MySubCatPage from "./components/UI/subCatPage/MySubCatPage";

function App() {
  const [currentID, setCurrentID] = useState(1);
  const [currentSubCat, setCurrentSubCat] = useState('sub cut 32')

  const users = [
    {userId: 1, userName: 'Stepa', password: 'jopa'},
    {userId: 2, userName: 'Stepa1', password: 'jopa1'},
    {userId: 3, userName: 'Stepa2', password: 'jopa2'},
  ]
  
  const categories = [
    {name: 'category 1', subcategories: ['sub cut 1', 'sub cut 2', 'sub cut 3']},
    {name: 'category 2', subcategories: ['sub cut 11', 'sub cut 21', 'sub cut 31']},
    {name: 'category 3', subcategories: ['sub cut 12', 'sub cut 22', 'sub cut 32']},
    {name: 'category 4', subcategories: ['sub cut 13', 'sub cut 23', 'sub cut 33']},
  ]

  const [subcategories, setSubcategories] = useState([
    {subcategory: 'sub cut 32', pageDescription: 'Sub cut description 32'},
  ])

  const [pages , setPages] = useState([
    {pageId: 1, pageName: 'Name 1', subcategory: 'sub cut 32', pageDescription: 'description 1',},
    {pageId: 2, pageName: 'Name 2', subcategory: 'sub cut 11', pageDescription: 'description 2',},
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
    console.log(inputBody);
    setInputBody('');
  }

  const [isOpen, setIsOpen] = useState(true);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen3, setIsOpen3] = useState(true);

  const [visible, setVisible] = useState(false);

  let [switcher, setSwitcher] = useState(true);

  return (
    <div className="App">
      <div className={classes.backImg}></div>
      <div className={classes.bk}>
        <MyModal visible={visible} setVisible={setVisible}>
          <MyForm visible={visible} setVisible={setVisible} switcher={switcher} setSwitcher={setSwitcher} users={users}/>
        </MyModal>
        <MyHeader>
          <div className={classes.catMenu}>
            <MyButton onClick={(e) => {
              setIsOpen(!isOpen);
              e.target.nextSibling.style.left = e.target.offsetLeft + 'px';
              }}>
              {categories[0].name}
            </MyButton>
            <MyListMenu isOpen={isOpen} setIsOpen={setIsOpen} category={categories[0]}/>

            <MyButton onClick={(e) => {
              setIsOpen1(!isOpen1);
              e.target.nextSibling.style.left = e.target.offsetLeft + 'px';
              }}>
              {categories[1].name}
            </MyButton>
            <MyListMenu isOpen={isOpen1} setIsOpen={setIsOpen1} category={categories[1]}/>

            <MyButton onClick={(e) => {
              setIsOpen2(!isOpen2);
              e.target.nextSibling.style.left = e.target.offsetLeft + 'px';
              }}>
              {categories[2].name}
            </MyButton>
            <MyListMenu isOpen={isOpen2} setIsOpen={setIsOpen2} category={categories[2]}/>

            <MyButton onClick={(e) => {
              setIsOpen3(!isOpen3);
              e.target.nextSibling.style.left = e.target.offsetLeft + 'px';
              }}>
              {categories[3].name}
            </MyButton>
            <MyListMenu isOpen={isOpen3} setIsOpen={setIsOpen3} category={categories[3]}/>
          </div>

          <MyInput 
            value={inputBody} 
            onChange={event => setInputBody(event.target.value)} 
            type='text' 
            placeholder='Search'/>
            <img onClick={handleSearch} src="https://www.svgrepo.com/show/493720/search-magnify-magnifier-glass.svg" alt="search" height={36} width={30} className={classes.searchImg}/>

          <img onClick={() => {
            setVisible(!visible);
          }} src="https://www.svgrepo.com/show/453446/account.svg" height={50} width={50} alt="acc img" className={classes.accImg}/>
        </MyHeader>

        <div className={classes.pageBlock}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MyHomePage />}/>
              <Route path="subcategory" element={
                <>
                  <MySubCatPage setCurrentID={setCurrentID} currentID={currentID} 
                  currentSubCat={currentSubCat} setSubcategories={setSubcategories} 
                  subcategories={subcategories} 
                  pages={pages} setPages={setPages} 
                  pageContent={pageContent} setPageContent={setPageContent}
                  comments={comments} setComments={setComments}
                  history={history} setHistory={setHistory}/>
                </>
                }/>
              <Route path="history" element={
                <>
                  <MyHistory history={history[pages.findIndex(pageHistory => pageHistory.pageId == currentID)]} pageName={pages[pages.findIndex(page => page.pageId == currentID)].pageName} />
                </>
                }/>
              <Route path="content" element={
                <>
                  <MyNavbar pageName={pages[pages.findIndex(page => page.pageId == currentID)].pageName} setPages={setPages} paragraphs={pageContent[pages.findIndex(page => page.pageId == currentID)].content}/>
                  <MyContentBlock currentID={currentID} pages={pages} setPages={setPages} paragraphs={pageContent} setPageContent={setPageContent} categories={categories} history={history} setHistory={setHistory}/>
                  <MyCommentBlock currentID={currentID} comments={comments} setComments={setComments}/>
                </>
              }/>
            </Routes>
          </BrowserRouter>
          
        </div>
      </div>
    </div>
  );
}

export default App;
