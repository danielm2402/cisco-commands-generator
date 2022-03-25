import React from 'react'
import styles from './Styles.module.css'
export default function RightSection({ children }) {
    return (
        <div className={styles.rightSection}>{children}</div>
    )
}
