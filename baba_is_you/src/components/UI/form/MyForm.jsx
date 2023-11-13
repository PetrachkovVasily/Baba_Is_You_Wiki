import React, { useState } from "react"
import classes from './MyForm.module.css'
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";

function MyForm({visible, setVisible, switcher, setSwitcher}) {
    const [head, setHead] = useState('LOG IN');
    const [switchBtn, setSwitchBtn] = useState('Sign up');
    

    function handleSwitch() {
        if (switcher) {
            setSwitchBtn('Log in');
            setHead('SIGN UP');
        } else {
            setSwitchBtn('Sign up');
            setHead('LOG IN');
        }
        setSwitcher(!switcher);
    }

    function formSender() {
        setVisible(!visible);
    }
    return (
        <div className={classes.myForm}>
            <h1 className={classes.myHead}>{head}</h1>
            <MyInput className={classes.formInput} placeholder='Login'/>
            <MyInput className={classes.formInput} placeholder='Password' type='password'/>
            <h1 onClick={handleSwitch} className={classes.switchBtn}>
                /{switchBtn}
            </h1>
            <button onClick={formSender} className={classes.formBtn}>{head}</button>
        </div>
    )
}

export default MyForm
