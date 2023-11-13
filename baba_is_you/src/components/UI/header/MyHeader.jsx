import React from "react"
import classes from "./MyHeader.module.css"

function MyHeader({children}) {
    return (
      <header className={classes.myHeader}>
      <h1 style={{width: '255px', color: "white", fontWeight: "bold", fontSize: '38px'}}>WIKI IS YOU</h1>
        {children}
      </header>
    )
}

export default MyHeader
