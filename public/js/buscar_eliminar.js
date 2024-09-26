const btnBuscar = document.querySelector("#buscar");
const informationUser = document.querySelector("#information-user");

btnBuscar.addEventListener("click", () => {
    informationUser.innerHTML = `
            <h3 class="section-label">Datos personales</h3>
                <div class="form-group">
                    <label for="cedulaCiudadania">Cédula de Ciudadanía</label>
                    <input type="text" id="cedulaCiudadania" name="cedulaCiudadania"
                        placeholder="Ingrese cédula de ciudadanía" readonly>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="nombre">Primer nombre</label>
                        <input type="text" id="nombre" placeholder="Nombre" readonly>
                    </div>
                    <div class="form-group">
                        <label for="apellido">Primer apellido</label>
                        <input type="text" id="apellido" placeholder="Apellido" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="fechaNacimiento">Fecha de Cumpleaños</label>
                        <input type="date" id="fechaNacimiento" readonly>
                    </div>
                    <div class="form-group">
                        <label for="genero">Género</label>
                        <input type="text" id="genero" placeholder="Género" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="direccion">Dirección</label>
                        <input type="text" id="direccion" placeholder="Calle tal" readonly>
                    </div>
                    <div class="form-group">
                        <label for="telefono">Teléfono</label>
                        <input type="text" id="telefono" placeholder="3118008000" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="correo">Correo Electrónico</label>
                        <input type="text" id="correo" placeholder="correo@example" readonly>
                    </div>
                    <div class="form-group">
                        <label for="estadoCivil">Estado civil</label>
                        <input type="text" id="estadoCivil" placeholder="Soltero" readonly>
                    </div>
                </div>
    
                <h3>Datos de la cuenta</h3>
                <br>
                <div class="form-row">
                    <div class="form-group">
                        <label for="tipoCuenta">Tipo de cuenta</label>
                        <input type="text" id="tipoCuenta" placeholder="AHORROS" readonly>
                    </div>
                    <div class="form-group">
                        <label for="numeroCuenta">Número de cuenta</label>
                        <input type="text" id="numeroCuenta" placeholder="1223334444" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" placeholder="contraseña" class="password">
                    </div>
                    <div class="form-group">
                        <label for="saldo">Saldo</label>
                        <input type="text" id="saldo" placeholder="100.000" readonly>
                    </div>
                </div>
                <div class="form-group">
                    <label for="fechaApertura">Fecha de apertura de cuenta</label>
                    <input type="date" id="fechaApertura" readonly>
                </div>
                <button type="button" class="btn btn-eliminar">Eliminar</button>`
})