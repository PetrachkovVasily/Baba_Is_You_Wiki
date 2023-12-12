import React, { useState } from "react"
import classes from './MyForm.module.css'
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";

function MyForm({visible, setVisible, switcher, setSwitcher, users, setUsers, setCurrentUserID}) {
    const rootErrorClasses = [classes.errorMessenge];

    const [head, setHead] = useState('LOG IN');
    const [switchBtn, setSwitchBtn] = useState('Sign up');
    let [errorMessenge, setErrorMessenge] = useState(null);

    const loginInput = (document.getElementById('loginInput'));
    const passwordInput = (document.getElementById('passwordInput'));

    const EXISTED_LOGIN = 'This login is alresdy existed';
    const NOT_EXISTED_ACCOUNT = 'This login do not exist';
    const BANNED_ACCOUNT = 'This account was bunned';
    const WRONG_PASSWORD = 'Wrong password';


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
        if (errorMessenge == '') {
            setVisible(!visible);
        }
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
                    {userId: newID, isAuth: true, isAdmin: false, isBlocked: false, userName: loginInput.value, password: passwordInput.value, pages: []}
                ]
            )
            setCurrentUserID(newID)
            setErrorMessenge('');
            errorMessenge = '';
        } else {
            setErrorMessenge(EXISTED_LOGIN);
        }
    }

    function authUser(loginInput, passwordInput) {
        users.map(user => {
            if (user.userName == loginInput.value) {
                if (user.password == passwordInput.value) {
                    if (user.isBlocked) {
                        setErrorMessenge(BANNED_ACCOUNT);
                        return user;
                    }
                    setCurrentUserID(user.userId);
                    setErrorMessenge('');
                    errorMessenge = '';
                    return {...user, isAuth: true};
                } else {
                    setErrorMessenge(WRONG_PASSWORD);
                    return user;
                }
            } else {
                setErrorMessenge(NOT_EXISTED_ACCOUNT);
                return user;
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

    return (
        <div className={classes.myForm}>
            <h1 className={classes.myHead}>{head}</h1>
            <MyInput id='loginInput' className={classes.formInput} placeholder='Login'/>
            <MyInput id='passwordInput' className={classes.formInput} placeholder='Password' type='password'/>
            <h3 className={rootErrorClasses.join(' ')}>{errorMessenge}</h3>
            <h1 onClick={handleSwitch} className={classes.switchBtn}>
                /{switchBtn}
            </h1>
            <button onClick={formSender} className={classes.formBtn}>{head}</button>
        </div>
    )
}

export default MyForm
