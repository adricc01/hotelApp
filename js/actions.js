var fn = {
	deviceready: function(){
		//alert();
		document.addEventListener("deviceready", fn.init/*this.init*/, false);
	},
	init: function(){
		/*
		 * En esta sección vamos a asociar
		 * todos los eventos del "Click" al HTML
		 */
		$("#botonRegistrar").tap(fn.registar);
		$("#botonTomarFoto").tap(mc.abrirCamara);
	},
	registar: function(){
		/*
		 * 1) Obtener todos los datos del fomrmulario
		 */
		var nombre = $("#nombreRegistro").val();
		var email = $("#emailRegistro").val();
		var password = $("#passwordRegistro").val();
		var telefono = $("#telefonoRegistro").val();
		var foto = $("#fotoTomadaRegistro img")[0];
		try{
			if(foto == undefined){
				throw new Error("Debe de tomar una foto");
			}
			if(typeof nombre !== "string"){
				throw new Error("El nombre no es valido");
			}
			if(nombre == ""){
				throw new Error("El nombre es forzozo");
			}
			if(email == ""){
				throw new Error("El email es forzozo");
			}
			if(password == ""){
				throw new Error("El password es forzozo");
			}
			if(email.indexOf("@") == -1){
				throw new Error("El email debe contener un arroba");
			}
			if(Number.isNaN(Number(telefono))){
				throw new Error("El telefono debe ser númerico");
			}
			if(telefono == ""){
				throw new Error("El teléfono es forzozo");
			}
			/*
			 * Registrar al usuario
			 */
			fn.enviarRegistro(nombre, email, telefono, password, foto);
		}catch(error){
			alert(error);
		}
	},
	enviarRegistro: function(nombreR, emailR, telefonoR, passwordR, fotoR){
		$.ajax({
			method: "POST",
			url: "http://www.colors.edu.mx/archivoTest.php",
			data: { 
				nombre: nombreR, 
				email: emailR,
				tel: telefonoR,
				password: passwordR
			}
		})
		.done(function(mensaje){
			if(mensaje == 1){
				var fotoURL = fotoR.src;
				file.transferir(fotoURL);
			}else{
				alert("Error al enviar datos de registro: "+mensaje);
			}
		});
	}
};
/*
 *Llamar al metodo Init en el navegador
 */
//fn.init();

/*
 *Llamar deviceready para compilar
 */
//
//$(fn.deviceready());
fn.deviceready();