import React from "react"
import classes from "./MyHeader.module.css"

function MyHeader({children}) {
    return (
      <header className={classes.myHeader}>
        {children}
      </header>
    )
}

export default MyHeader
