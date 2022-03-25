import React from 'react'

export default function Eigrp() {
  const [eigrp, setEigrp] = useState([])

  const handlerEigrp = (e, i) => {
    let array = [...eigrp]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setEigrp(array)
  }
  
  return (
    <div style={{ paddingTop: '20px' }}>
      {eigrp.length > 0 &&
        <div>
          EIGRP
          {eigrp.map((item, index) => {
            return (<div>
              <label>Network:</label>
              <input value={item.ip} name="ip" onChange={(e) => handlerEigrp(e, index)} />
              <input value={item.wildcard} name="wildcard" onChange={(e) => handlerEigrp(e, index)} ></input>
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
              router eigrp 10
            </code>
            {eigrp.map(item => {
              return <code style={{ display: 'block' }}>
                network {ValidateIPaddress(item.ip) ? item.ip : 'error'} {wildcard[item.wildcard]}
              </code>
            })}
            <code style={{ display: 'block' }}>
              no auto-summary
            </code>
            <div style={{ paddingTop: '20px' }}>
              {router.switchs.map((item, index) => {
                if (item.interfaceType == 'gigabitEthernet' || item.interface == 'fastEthernet') {
                  return <code style={{ display: 'block' }}>
                    passive-interface {item.interfaceType} {item.interface}
                  </code>
                }
              })}
            </div>
          </div>
        </div>

      }
    </div>
  )
}
