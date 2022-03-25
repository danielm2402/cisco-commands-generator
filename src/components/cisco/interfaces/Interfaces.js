import React, { useState } from 'react'
import { ValidateIPaddress, prefijos } from '../../../utils/ip'
import ContainerSection from '../../grids/ContainerSection'
import LeftSection from '../../grids/LeftSection'
import RightSection from '../../grids/RightSection'

export default function Interfaces() {
  const [router, setRouter] = useState({ switchs: [] })

  const handlerSwitch = (e, i) => {
    let array = [...router.switchs]
    array[i] = { ...array[i], [e.target.name]: e.target.value }
    setRouter({ switchs: [...array] })
  }

  return (
    <ContainerSection>
      <LeftSection>
        Hola
      </LeftSection>
      <RightSection>
        mundo
      </RightSection>
    </ContainerSection>
    /*  <div style={{ paddingTop: '20px' }}>
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
       </div>
     </div> */
  )
}
