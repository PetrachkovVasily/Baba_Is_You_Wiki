import React, { useRef, useState } from "react";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MyHeader from "./components/UI/header/MyHeader";
import MyListMenu from "./components/UI/listMenu/MyListMenu";

function App() {
  const category = {
    name: 'category 1',
    subcutegories: ['sub cut 1', 'sub cut 2', 'sub cut 3']
  }
  const categories = [
    {name: 'category 1', subcutegories: ['sub cut 1', 'sub cut 2', 'sub cut 3']},
    {name: 'category 2', subcutegories: ['sub cut 11', 'sub cut 21', 'sub cut 31']},
    {name: 'category 3', subcutegories: ['sub cut 12', 'sub cut 22', 'sub cut 32']},
  ]
  const [inputBody, setInputBody] = useState('');
  let leftPosition;

  function handleClick(event) {
    console.log(inputBody);
  }

  const [isOpen, setIsOpen] = useState(true);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="App">
      <MyHeader>
        <MyButton onClick={(e) => {
          setIsOpen(!isOpen);
          e.target.nextSibling.style.left = e.target.offsetLeft + 'px';
          }}>
          {categories[0].name}
        </MyButton>
        <MyListMenu isOpen={isOpen} leftPosition={leftPosition} category={categories[0]}/>

        <MyButton onClick={(e) => {
          setIsOpen1(!isOpen1);
          e.target.nextSibling.style.left = e.target.offsetLeft + 'px';
          }}>
          {categories[1].name}
        </MyButton>
        <MyListMenu isOpen={isOpen1} leftPosition={leftPosition} category={categories[1]}/>

        <MyButton onClick={(e) => {
          setIsOpen2(!isOpen2);
          e.target.nextSibling.style.left = e.target.offsetLeft + 'px';
          }}>
          {categories[2].name}
        </MyButton>
        <MyListMenu isOpen={isOpen2} leftPosition={leftPosition} category={categories[2]}/>

      </MyHeader>
      <MyButton onClick={handleClick}>
        Baton
      </MyButton>
      <MyInput value={inputBody} onChange={event => setInputBody(event.target.value)} type='text' placeholder='Input for texting'/>
      
    </div>
  );
}

export default App;
