import React from 'react'
import styles from './Navbar.module.css'
import github from '../../images/github.png'
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <div className={styles.containerNav}>
            <a>CCG</a>
            <ul className={styles.navbar}>
                <li><Link to="/interfaces">Interfaces</Link></li>
                <li><Link to="/rip">Rip</Link></li>
                <li><Link to="/eigrp">Eigrp</Link></li>
                <li><Link to="/ospf">Ospf</Link></li>
                <li><Link to="/summarization">Summarization</Link></li>
            </ul>
            <a><img className={styles.github} src={github} /></a>
        </div>

    )
}
