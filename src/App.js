import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'


const prefijos = {
  32: '255.255.255.255',
  31: '255.255.255.254',
  30: '255.255.255.252',
  29: '255.255.255.248',
  28: '255.255.255.240',
  27: '255.255.255.224',
  26: '255.255.255.192',
  25: '255.255.255.128',
  24: '255.255.255.0',
  23: '255.255.254.0',
  22: '255.255.252.0',
  21: '255.255.248.0',
  20: '255.255.240.0',
  19: '255.255.224.0',
  18: '255.255.192.0',
  17: '255.255.128.0',
  16: '255.255.0.0',
  15: '255.254.0.0',
  14: '255.252.0.0',
  13: '255.248.0.0',
  12: '255.240.0.0',
  11: '255.224.0.0',
  10: '255.192.0.0',
  9: '255.128.0.0',
  8: '255.0.0.0',
  7: '254.0.0.0',
  6: '252.0.0.0',
  5: '248.0.0.0',
  4: '240.0.0.0',
  3: '224.0.0.0',
  2: '192.0.0.0',
  1: '128.0.0.0',
}


function App() {
  const [router, setRouter] = useState({ switchs: [] })
  const [rip, setRip] = useState([])
  const [loop, setLoop] = useState([])
  const [cisco, setCisco] = useState({ nombre: '', contrasena: '' })

  const addSwitch = () => {
    const swi = { interface: '', ip: '', interfaceType: 'gigabitEthernet', prefix: '' }
    setRouter({ ...router, switchs: [...router.switchs, swi] })
  }
  const addRip = () => {
    const r = { ip: '' }
    setRip([...rip, r])
  }
  const addLoop = () => {
    const l = { ip: '', numero: '', mascara: '' }
    setLoop([...loop, l])
  }
  const handlerSwitch = (e, i) => {
    let array = [...router.switchs]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setRouter({ switchs: [...array] })
  }
  const handlerRip = (e, i) => {
    let array = [...rip]
    array[i] = { ...array[i], ip: e.target.value }
    setRip(array)
  }
  const handlerLoop = (e, i) => {
    let array = [...loop]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setLoop(array)
  }
  return (
    <div>
      <div>
        <label>Switches conectados al router</label>
        <button onClick={addSwitch}>+</button>
        <button onClick={addLoop}>LOOPBACK</button>
        <button onClick={addRip}>RIP</button>

      </div>

      <div style={{ paddingTop: '20px' }}>
        INTERFACES
        {router.switchs.map((sw, i) => {
          return (<div>
            <label>interface type</label>
            <select name='interfaceType' value={sw.interfaceType} onChange={(e) => { handlerSwitch(e, i) }} >
              <option value="gigabitEthernet">gigabitEthernet</option>
              <option value="serial" selected>serial</option>
            </select>

            <label>interface</label>
            <input name='interface' value={sw.interface} onChange={(e) => { handlerSwitch(e, i) }}></input>

            <label>ip</label>
            <input name='ip' value={sw.ip} onChange={(e) => { handlerSwitch(e, i) }}></input>

            <label>Prefix</label>
            <input name='prefix' value={sw.prefix} onChange={(e) => { handlerSwitch(e, i) }}></input>
          </div>)
        })}
      </div>
      <div>
        {router.switchs.length > 0 &&
          router.switchs.map((item, index) => {
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
                  {item.interfaceType == 'serial' ? <code style={{ display: 'block' }}>clock rate 64000 *</code> : <></>}
                  <code style={{ display: 'block' }}>
                    ip address {item.ip} {prefijos[item.prefix]}
                  </code>
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
                  ip address {item.ip} {prefijos[item.prefix]}
                </code>
                <code style={{ display: 'block' }}>
                  no shutdown
                </code>
              </div>
            )
          })

        }
      </div>

      <div style={{ paddingTop: '20px' }}>
        LOOPBACK
        {loop.length > 0 && <div>
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
                ip address {item.ip} {prefijos[item.mascara]}
              </code>

            </div>
          })}
        </div>}
      </div>


      <div style={{ paddingTop: '20px' }}>
        RIP
        {rip.length > 0 &&
          <div>
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
                  network {item.ip}
                </code>

              })}
              <code style={{ display: 'block' }}>
                no auto-summary
              </code>
            </div>
            <div style={{ paddingTop: '20px' }}>
              {router.switchs.map((item, index) => {
                if (item.interfaceType == 'gigabitEthernet') {
                  return <code style={{ display: 'block' }}>
                    passive-interface {item.interfaceType} {item.interface}
                  </code>
                }
              })}
            </div>
          </div>

        }
      </div>


      <div style={{ paddingTop: '20px' }}>
        ISP
        <div>
          <code style={{ display: 'block' }}>
            ip route "ip calculada" "mascara calculada" "salto"
          </code>
          <code style={{ display: 'block' }}>
            ip route 0.0.0.0 0.0.0.0 "salto"
          </code>
          <code style={{ display: 'block' }}>
            router rip
          </code>
          <code style={{ display: 'block' }}>
            default-information originate
          </code>
        </div>

      </div>

      <div style={{ paddingTop: '20px' }}>
        RUTA ESTATICA DE RESUMEN
        <div>
          <code style={{ display: 'block' }}>
            ip route ip mascara null0
          </code>
          <code style={{ display: 'block' }}>
            router rip
          </code>
          <code style={{ display: 'block' }}>
            redistribute static
          </code>
        </div>
      </div>

      <div style={{ marginTop: '120px' }}>
        <label>nombre</label>
        <input value={cisco.nombre} onChange={(e) => { setCisco({ ...cisco, nombre: e.target.value }) }}></input>
        <label>contraseña</label>
        <input value={cisco.contrasena} onChange={(e) => { setCisco({ ...cisco, contrasena: e.target.value }) }}></input>
        <div style={{paddingTop:'20px'}}>
          <code style={{ display: 'block' }}>
            enable
          </code>
          <code style={{ display: 'block' }}>
            configure terminal
          </code>
          <code style={{ display: 'block' }}>
            hostname {cisco.nombre}
          </code>
          <code style={{ display: 'block' }}>
            enable password {cisco.contrasena}
          </code>
          <code style={{ display: 'block' }}>
            line console 0
          </code>
          <code style={{ display: 'block' }}>
            password {cisco.contrasena}
          </code>
          <code style={{ display: 'block' }}>
            login
          </code>
          <code  style={{ display: 'block' }}>
            exit
          </code>
          <code  style={{ display: 'block' }}>
            line vty 0 4
          </code>
          <code style={{ display: 'block' }}>
            password {cisco.contrasena}
          </code>
          <code style={{ display: 'block' }}>
            login
          </code>
          <code style={{ display: 'block' }}>
            exit
          </code>
        </div>
      </div>
    </div >



  );
}

export default App;
