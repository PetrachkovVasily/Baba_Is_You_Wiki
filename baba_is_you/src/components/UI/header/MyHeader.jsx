import React from "react"
import classes from "./MyHeader.module.css"
import { Link } from "react-router-dom"

function MyHeader({children}) {
    return (
      <header className={classes.myHeader}>
      <Link to={`/`} style={{width: '255px', color: "white", fontWeight: "bold", fontSize: '38px', textDecoration: 'none'}}>WIKI IS YOU</Link>
        {children}
      </header>
    )
}

export default MyHeader
