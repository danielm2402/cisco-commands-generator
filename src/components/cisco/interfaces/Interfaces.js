import React, { useState } from 'react'
import { ValidateIPaddress, prefijos } from '../../../utils/ip'
import ContainerSection from '../../grids/ContainerSection'
import LeftSection from '../../grids/LeftSection'
import RightSection from '../../grids/RightSection'
import styles from './Interfaces.module.css'

export default function Interfaces() {
  const [interf, setInterf] = useState([{ interface: '', ip: '', prefix: '' }])

  const handlerSwitch = (e, i) => {
    let array = [...interf]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setInterf([...array])
  }
  const addInterface = () => {
    const i = { interface: '', ip: '', prefix: '' }
    setInterf([...interf, i])
  }

  return (
    <ContainerSection>
      <LeftSection buttons={[<a className={styles.button} onClick={addInterface}>+</a>]}>
        {interf.map((sw, i) => {
          return (<div className={styles.interface}>
            <div className={styles.interfaceTitle}>
              <h1>Interface #{i}</h1>
              <label>type</label>
              <select className={styles.input} name='interfaceType' value={sw.interfaceType} onChange={(e) => { handlerSwitch(e, i) }} >
                <option value="gigabitEthernet">gigabitEthernet</option>
                <option value="serial" selected>serial</option>
                <option value="fastEthernet" selected>fastEthernet</option>
              </select>
            </div>
            <div className={styles.interfaceInformation}>
              <label>slot</label>
              <input className={styles.input} name='interface' value={sw.interface} onChange={(e) => { handlerSwitch(e, i) }}></input>

              <label>ip</label>
              <input className={styles.input} name='ip' value={sw.ip} onChange={(e) => { handlerSwitch(e, i) }}></input>

              <label>Prefix</label>
              <input className={styles.input} name='prefix' value={sw.prefix} onChange={(e) => { handlerSwitch(e, i) }}></input>
              {sw.interfaceType === 'serial' && <>
                <label>Bandwidth</label>
                <input className={styles.input} name='bandwidth' value={sw.bandwidth} onChange={(e) => { handlerSwitch(e, i) }}></input></>}
            </div>
          </div>)
        })}
      </LeftSection>
      <RightSection>
        {interf.length > 0 &&
          interf.map((item, index) => {
            if (index === 0) {
              return (
                <div style={{ paddingTop: '20px' }}>
                  <code style={{ display: 'block' }}>
                    enable
                  </code>
                  <code style={{ display: 'block' }}>
                    configure terminal
                  </code>
                  <code style={{ display: 'block' }}>
                    interface {item.interfaceType} {item.interface}
                  </code>
                  <code style={{ display: 'block' }}>
                    ip address {ValidateIPaddress(item.ip) ? item.ip : 'error'} {prefijos[item.prefix]}
                  </code>
                  {item.bandwidth &&
                    <code style={{ display: 'block' }}>
                      bandwidth {item.bandwidth}
                    </code>
                  }
                  <code style={{ display: 'block' }}>
                    no shutdown
                  </code>

                </div>
              )
            }
            return (
              <div style={{ paddingTop: '20px' }}>
                <code style={{ display: 'block' }}>
                  exit
                </code>
                <code style={{ display: 'block' }}>
                  interface {item.interfaceType} {item.interface}
                </code>
                <code style={{ display: 'block' }}>
                  ip address  {ValidateIPaddress(item.ip) ? item.ip : 'error'} {prefijos[item.prefix]}
                </code>
                {item.bandwidth &&
                  <code style={{ display: 'block' }}>
                    bandwidth {item.bandwidth}
                  </code>
                }
                <code style={{ display: 'block' }}>
                  no shutdown
                </code>
              </div>
            )
          })

        }
      </RightSection>
    </ContainerSection>
  )
}
