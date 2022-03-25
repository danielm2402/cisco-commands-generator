import React from 'react'
import styles from './Styles.module.css'
export default function ContainerSection({ children }) {
    return (
        <div className={styles.containerSection}>{children}</div>
    )
}
