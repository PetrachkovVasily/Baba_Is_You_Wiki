import React from "react"
import classes from "./MyHeader.module.css"
import { Link } from "react-router-dom"

function MyHeader({children, wikiName}) {
    return (
      <header className={classes.myHeader}>
      <Link to={`/`} className={classes.wiki} style={{width: '255px', color: "white", fontWeight: "bold", fontSize: '38px', textDecoration: 'none', marginLeft: '15px'}}>{wikiName}</Link>
        {children}
      </header>
    )
}

export default MyHeader
