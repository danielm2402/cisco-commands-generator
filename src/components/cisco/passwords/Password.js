import React from 'react'

export default function Password() {
    const [cisco, setCisco] = useState({ nombre: '', contrasena: '' })

    return (
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
    )
}
