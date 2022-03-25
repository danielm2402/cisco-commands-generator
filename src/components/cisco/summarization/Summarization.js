import React from 'react'

export default function Summarization() {
  const [sumarizacion, setSumarizacion] = useState([])
  const [totalSum, setTotalSum] = useState({ ip: [], mascara: '0', binario: [] })

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
  )
}
