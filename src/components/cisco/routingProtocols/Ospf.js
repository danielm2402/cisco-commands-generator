import React from 'react'

export default function Ospf() {
  const [ospf, setOspf] = useState([])
  const hadlerOspf = (e, i) => {
    let array = [...ospf]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setOspf(array)
  }
  return (
    <div style={{ paddingTop: '20px' }}>
      {ospf.length > 0 &&
        <div>
          OSPF
          {ospf.map((item, index) => {
            return (<div>
              <label>Network:</label>
              <input value={item.ip} name="ip" onChange={(e) => hadlerOspf(e, index)} />
              <label>Prefijo</label>
              <input value={item.prefix} name="prefix" onChange={(e) => hadlerOspf(e, index)} />
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
              router ospf 1
            </code>
            {ospf.map(item => {
              return <code style={{ display: 'block' }}>
                network {ValidateIPaddress(item.ip) ? item.ip : 'error'} {wildcard[item.prefix]} area 0
              </code>

            })}
          </div>
          <div style={{ paddingTop: '20px' }}>
            {router.switchs.map((item, index) => {
              if (item.interfaceType == 'gigabitEthernet' || item.interfaceType == 'fastEthernet') {
                return <code style={{ display: 'block' }}>
                  passive-interface {item.interfaceType} {item.interface}
                </code>
              }
            })}
          </div>
        </div>

      }
    </div>
  )
}
