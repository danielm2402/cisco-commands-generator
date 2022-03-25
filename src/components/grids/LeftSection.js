import React from 'react'
import styles from './Styles.module.css'

export default function LeftSection({children}) {
  return (
    <div className={styles.leftSection}>{children}</div>
  )
}
