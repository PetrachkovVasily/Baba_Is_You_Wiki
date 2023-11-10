import React, { useState } from "react"
import classes from './MyForm.module.css'
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";

function MyForm({visible, setVisible}) {
    const [head, setHead] = useState('LOG IN');
    const [switchBtn, setSwitchBtn] = useState('Registration');
    let [switcher, setSwitcher] = useState(true);

    function handleSwitch() {
        if (switcher) {
            setSwitchBtn('Log in');
            setHead('REGISTRATION');
        } else {
            setSwitchBtn('Registration');
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
            <MyButton onClick={handleSwitch} className={classes.switchBtn}>
                /{switchBtn}
            </MyButton>
            <MyButton onClick={formSender} className={classes.formBtn}>
                {head}
            </MyButton>
        </div>
    )
}

export default MyForm
