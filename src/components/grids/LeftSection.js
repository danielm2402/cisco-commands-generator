import React from 'react'
import styles from './Styles.module.css'

export default function LeftSection({ children, buttons }) {
    return (
        <div className={styles.leftSection}>
            <Buttons>{buttons}</Buttons>
            {children}
        </div>
    )
}



function Buttons({children}) {
    return (
        <div className={styles.buttons}>{children}</div>
    )
}

