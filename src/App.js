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

const wildcard = {
  30: '0.0.0.3',
  29: '0.0.0.7',
  28: '0.0.0.15',
  27: '0.0.0.31',
  26: '0.0.0.63',
  25: '0.0.0.127',
  24: '0.0.0.255',
  23: '0.0.1.255',
  22: '0.0.3.255',
  21: '0.0.7.255',
  20: '0.0.15.255',
  19: '0.0.31.255',
  18: '0.0.63.255',
  17: '0.0.127.255',
  16: '0.0.255.255',
  15: '0.1.255.255',
  14: '0.3.255.255',
  13: '0.7.255.255',
  12: '0.15.255.255',
  11: '0.31.255.255',
  10: '0.63.255.255',
  9: '0.127.255.255',
  8: '0.255.255.255',
  7: '1.255.255.255',
  6: '3.255.255.255',
  5: '7.255.255.255',
  4: '15.255.255.255',
  3: '31.255.255.255',
  2: '63.255.255.255',
  1: '127.255.255.255',
}

function ValidateIPaddress(ipaddress) {  
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return (true)  
  }  
  return (false)  
}  

const convertToBinary1 = (number) => {
  let num = number;
  let binary = (num % 2).toString();
  for (; num > 1;) {
    num = parseInt(num / 2);
    binary = (num % 2) + (binary);
  }

  const countDig = 8 - binary.toString().length
  let newBi = binary.toString()
  for (let index = 0; index < countDig; index++) {
    newBi = '0' + newBi
  }
  return newBi
}

function BinarioADecimal(num) {
  let sum = 0;

  for (let i = 0; i < num.length; i++) {
    sum += +num[i] * 2 ** (num.length - 1 - i);
  }
  return sum;
}


function App() {
  const [router, setRouter] = useState({ switchs: [] })
  const [rip, setRip] = useState([])
  const [loop, setLoop] = useState([])
  const [cisco, setCisco] = useState({ nombre: '', contrasena: '' })
  const [eigrp, setEigrp] = useState([])
  const [sumarizacion, setSumarizacion] = useState([])
  const [totalSum, setTotalSum] = useState({ ip: [], mascara: '0', binario: [] })
  const [ospf, setOspf] = useState([])


  useEffect(() => {
    if (sumarizacion.length) {
      let sum = [...sumarizacion]
      let bite = 0

      for (let index = 0; index < 32; index++) {
        const ip = sum[0].binario
        for (let index1 = 1; index1 < sum.length; index1++) {
          if (sum[index1].binario[index] !== ip[index]) {
            console.log(index)
            bite = index;
            break;
          }
        }
        if (bite !== 0) {
          break;
        }
      }

      let newSum = [...sum]

      for (let index = 0; index < sum.length; index++) {
        let binario = [...newSum[index].binario]
        for (let index1 = 0; index1 < 32; index1++) {
          if (index1 >= bite) {
            binario[index1] = '0'
          }
        }

        newSum[index] = { ...newSum[index], binario: [...binario] }
      }

      if (newSum.length) {
        let sumarizada = [...newSum[0].binario]
        let finalip = []
        for (let index = 0; index < sumarizada.length;) {
          const sum = sumarizada[index].toString() + sumarizada[index + 1].toString() + sumarizada[index + 2].toString() + sumarizada[index + 3].toString() + sumarizada[index + 4].toString() + sumarizada[index + 5].toString() + sumarizada[index + 6].toString() + sumarizada[index + 7].toString()
          const num = BinarioADecimal(sum)
          finalip.push(num)
          index = index + 8
        }

        setTotalSum({ ip: finalip, binario: sumarizada, mascara: prefijos[bite] })
      }


    }
  }, [sumarizacion])

  const addSwitch = () => {
    const swi = { interface: '', ip: '', interfaceType: 'gigabitEthernet', prefix: '', bandwidth: null }
    setRouter({ ...router, switchs: [...router.switchs, swi] })
  }
  const addRip = () => {
    const r = { ip: '' }
    setRip([...rip, r])
  }
  const addEigrp = () => {
    const e = { ip: '', wildcard: '' }
    setEigrp([...eigrp, e])
  }
  const addLoop = () => {
    const l = { ip: '', numero: '', mascara: '' }
    setLoop([...loop, l])
  }
  const addOspf = () => {
    const o = { ip: '', prefix: '' }
    setOspf([...ospf, o])
  }
  const hadlerOspf = (e, i) => {
    let array = [...ospf]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setOspf(array)
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
  const handlerEigrp = (e, i) => {
    let array = [...eigrp]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setEigrp(array)
  }
  const handlerLoop = (e, i) => {
    let array = [...loop]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setLoop(array)
  }
  const addSumarizacion = () => {
    const sum = { ip: '', binario: [] }
    setSumarizacion([...sumarizacion, sum])
  }
  const handlerSumarizacion = (e, i) => {
    let array = [...sumarizacion]
    const myArray = e.target.value.split(".");
    const arraybi = myArray.map(element => {
      return convertToBinary1(element)
    });

    let a = []
    for (let index = 0; index < arraybi.length; index++) {
      const element = arraybi[index];
      a = [...a, ...arraybi[index]]
    }
    array[i] = { ...array[i], binario: a, ip: e.target.value }
    setSumarizacion(array)
  }
  return (
    <div>
      <div>
        <label>Switches conectados al router</label>
        <button onClick={addSwitch}>+</button>
        <button onClick={addLoop}>LOOPBACK</button>
        <button onClick={addRip}>RIP</button>
        <button onClick={addEigrp}>EIGRP</button>
        <button onClick={addOspf}> OSPF</button>
        <button onClick={addSumarizacion}> Sumarización</button>
      </div>

      <div style={{ paddingTop: '20px' }}>
        INTERFACES
        {router.switchs.map((sw, i) => {
          return (<div>
            <label>interface type</label>
            <select name='interfaceType' value={sw.interfaceType} onChange={(e) => { handlerSwitch(e, i) }} >
              <option value="gigabitEthernet">gigabitEthernet</option>
              <option value="serial" selected>serial</option>
              <option value="fastEthernet" selected>fastEthernet</option>
            </select>

            <label>interface</label>
            <input name='interface' value={sw.interface} onChange={(e) => { handlerSwitch(e, i) }}></input>

            <label>ip</label>
            <input name='ip' value={sw.ip} onChange={(e) => { handlerSwitch(e, i) }}></input>

            <label>Prefix</label>
            <input name='prefix' value={sw.prefix} onChange={(e) => { handlerSwitch(e, i) }}></input>
            {sw.interfaceType === 'serial' && <>
              <label>Bandwidth</label>
              <input name='bandwidth' value={sw.bandwidth} onChange={(e) => { handlerSwitch(e, i) }}></input></>}
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
                  <code style={{ display: 'block' }}>
                    ip address {ValidateIPaddress(item.ip)?item.ip:'error'} {prefijos[item.prefix]}
                  </code>
                  {item.bandwidth&&
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
                  ip address  {ValidateIPaddress(item.ip)?item.ip:'error'} {prefijos[item.prefix]}
                </code>
                {item.bandwidth&&
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
      </div>

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
                ip address {ValidateIPaddress(item.ip)?item.ip:'error'} {prefijos[item.mascara]}
              </code>

            </div>
          })}
        </div>}
      </div>


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
                  network {ValidateIPaddress(item.ip)?item.ip:'error'}
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
                  network {ValidateIPaddress(item.ip)?item.ip:'error'} {wildcard[item.wildcard]}
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
                  network {ValidateIPaddress(item.ip)?item.ip:'error'} {wildcard[item.prefix]} area 0
                </code>

              })}
            </div>
            <div style={{ paddingTop: '20px' }}>
              {router.switchs.map((item, index) => {
                if (item.interfaceType == 'gigabitEthernet' || item.interfaceType =='fastEthernet') {
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
        {sumarizacion.length > 0 &&
          <div>
            SUMARIZACIÓN
            {sumarizacion.map((item, index) => {
              return (<div>
                <label>IP:</label>
                <input value={item.ip} name="ip" onChange={(e) => handlerSumarizacion(e, index)} />
              </div>)
            })}

            <div style={{ padding: '20px' }}>
              <div>En ISP</div>
              <code style={{ display: 'block' }}>
                enable
              </code>
              <code style={{ display: 'block' }}>
                configure terminal
              </code>
              <code style={{ display: 'block' }}>
                ip route {totalSum.ip.toString().replaceAll(",", ".")} {totalSum.mascara} "salto"
              </code>
              <div>En router que conecta a ISP</div>
              <code style={{ display: 'block' }}>
                ip route 0.0.0.0 0.0.0.0 "salto"
              </code>
              {rip.length > 0 ?
                <div>
                  <code style={{ display: 'block' }}>
                    router rip
                  </code>
                  <code style={{ display: 'block' }}>
                    default-information originate
                  </code>
                </div> : <></>}
              {eigrp.length > 0 ?
                <div>
                  <code style={{ display: 'block' }}>
                    router eigrp 10
                  </code>
                  <code style={{ display: 'block' }}>
                    redistribute static
                  </code>
                </div> : <></>}
            </div>
          </div>

        }
      </div>
      {rip.length > 0 ?
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
        </div> : <></>
      }

      <div style={{ marginTop: '120px' }}>
        <h2>Configuración de nombre y contraseñas</h2>
        <label>nombre</label>
        <input value={cisco.nombre} onChange={(e) => { setCisco({ ...cisco, nombre: e.target.value }) }}></input>
        <label>contraseña</label>
        <input value={cisco.contrasena} onChange={(e) => { setCisco({ ...cisco, contrasena: e.target.value }) }}></input>
        <div style={{ paddingTop: '20px' }}>
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
          <code style={{ display: 'block' }}>
            exit
          </code>
          <code style={{ display: 'block' }}>
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

      <div style={{ marginTop: '120px' }}>
        <h2>Resolución de problemas</h2>
        <code style={{ display: 'block' }}>
          show ip eigrp neighbors
        </code>

      </div>
    </div >



  );
}

export default App;
