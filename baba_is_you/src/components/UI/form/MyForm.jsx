import React, { useState } from "react"
import classes from './MyForm.module.css'
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";

function MyForm({visible, setVisible, switcher, setSwitcher, users, setUsers, setCurrentUserID}) {
    const [head, setHead] = useState('LOG IN');
    const [switchBtn, setSwitchBtn] = useState('Sign up');
    const loginInput = (document.getElementById('loginInput'));
    const passwordInput = (document.getElementById('passwordInput'));

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
        if (switcher) {
            
            authUser(loginInput, passwordInput);
        } else {
            addNewUser(loginInput, passwordInput);
        }
        setVisible(!visible);
    }

    // const [users, setUsers] = useState([
    //     {userId: 1, isAuth: false, isBlocked: false, userName: 'Stepa', password: 'jopa', pages: []},
    // ])

    function addNewUser(loginInput, passwordInput) {
        let error = false;
        users.forEach(user => {
            if (user.userName == loginInput.value)
            error = true;
            return;
        })
        if(error == false) {
            const newID = setUserId(users)
            setUsers(
                [
                    ...users,
                    {userId: newID, isAuth: true, isBlocked: false, userName: loginInput.value, password: passwordInput.value, pages: []}
                ]
            )
            setCurrentUserID(newID)
        } else {
            alert('This login is alresdy existed')
        }
    }

    function authUser(loginInput, passwordInput) {
        let error = false;
        users.forEach(user => {
            if (user.userName == loginInput.value) {
                if (user.password == passwordInput.value) {
                    //замена isAuth
                }
            } else {
                return;
            }
            
        })
    }

    function setUserId (users) {
        if (users.length > 0) {
            return users.reduce((previous, current) => previous.userId > current.userId ? previous : current).userId + 1;
        } else {
            return 1;
        }
    }

    console.log(users)

    return (
        <div className={classes.myForm}>
            <h1 className={classes.myHead}>{head}</h1>
            <MyInput id='loginInput' className={classes.formInput} placeholder='Login'/>
            <MyInput id='passwordInput' className={classes.formInput} placeholder='Password' type='password'/>
            <h1 onClick={handleSwitch} className={classes.switchBtn}>
                /{switchBtn}
            </h1>
            <button onClick={formSender} className={classes.formBtn}>{head}</button>
        </div>
    )
}

export default MyForm
