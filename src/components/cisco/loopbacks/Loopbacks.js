import React from 'react'

export default function Loopbacks() {
  const [loop, setLoop] = useState([])

  const handlerLoop = (e, i) => {
    let array = [...loop]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setLoop(array)
  }

  
  return (
    <div style={{ paddingTop: '20px' }}>

      {loop.length > 0 && <div>
        LOOPBACK
        {loop.map((item, index) => {
          return <div style={{ paddingTop: '20px' }}>
            <label>ip</label>
            <input value={item.ip} name="ip" onChange={(e) => handlerLoop(e, index)}></input>
            <label>mascara</label>
            <input value={item.mascara} name="mascara" onChange={(e) => handlerLoop(e, index)}></input>
            <label>numero</label>
            <input value={item.numero} name="numero" onChange={(e) => handlerLoop(e, index)}></input></div>
        })}


        {loop.map((item, index) => {
          return <div style={{ paddingTop: '20px' }}>
            <code>
              exit
            </code>
            <code style={{ display: 'block' }}>
              interface loopback {item.numero}
            </code>
            <code style={{ display: 'block' }}>
              ip address {ValidateIPaddress(item.ip) ? item.ip : 'error'} {prefijos[item.mascara]}
            </code>

          </div>
        })}
      </div>}
    </div>
  )
}
