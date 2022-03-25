import React, { useState } from 'react'
import {ValidateIPaddress} from '../../../utils/ip'

export default function Rip() {
  const [rip, setRip] = useState([])

  const handlerRip = (e, i) => {
    let array = [...rip]
    array[i] = { ...array[i], ip: e.target.value }
    setRip(array)
  }
  
  return (
    <div>
      <div style={{ paddingTop: '20px' }}>
        {rip.length > 0 &&
          <div>
            RIP
            {rip.map((item, index) => {
              return (<div>
                <label>Network:</label>
                <input value={item.ip} onChange={(e) => handlerRip(e, index)} />
              </div>)
            })}
            <div style={{ padding: '20px' }}>
              <code style={{ display: 'block' }}>
                enable
              </code>
              <code style={{ display: 'block' }}>
                configure terminal
              </code>
              <code style={{ display: 'block' }}>
                router rip
              </code>
              <code style={{ display: 'block' }}>
                version 2
              </code>
              {rip.map(item => {
                return <code style={{ display: 'block' }}>
                  network {ValidateIPaddress(item.ip) ? item.ip : 'error'}
                </code>

              })}
              <code style={{ display: 'block' }}>
                no auto-summary
              </code>
            </div>
            <div style={{ paddingTop: '20px' }}>
             {/*  {router.switchs.map((item, index) => {
                if (item.interfaceType == 'gigabitEthernet') {
                  return <code style={{ display: 'block' }}>
                    passive-interface {item.interfaceType} {item.interface}
                  </code>
                }
              })} */}
            </div>
          </div>

        }
      </div>
    </div>
  )
}
