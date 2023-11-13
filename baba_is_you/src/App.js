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

function App() {
  
  const categories = [
    {name: 'category 1', subcutegories: ['sub cut 1', 'sub cut 2', 'sub cut 3']},
    {name: 'category 2', subcutegories: ['sub cut 11', 'sub cut 21', 'sub cut 31']},
    {name: 'category 3', subcutegories: ['sub cut 12', 'sub cut 22', 'sub cut 32']},
    {name: 'category 4', subcutegories: ['sub cut 13', 'sub cut 23', 'sub cut 33']},
  ]
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
          <MyForm visible={visible} setVisible={setVisible} switcher={switcher} setSwitcher={setSwitcher}/>
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
          <MyNavbar/>
          <MyContentBlock>
            <MyCommentBlock>
              <MyComment/>
            </MyCommentBlock>
          </MyContentBlock>
        </div>
      </div>
    </div>
  );
}

export default App;
