var fn = {
	deviceready: function(){
		//alert();
		document.addEventListener("deviceready", fn.init/*this.init*/, false);
	},
	init: function(){
		fn.ponerFecha();
		/*
		 * En esta sección vamos a asociar
		 * todos los eventos del "Click" al HTML
		 */

		$("#botonRegistrar").tap(fn.registar);
		$("#botonTomarFoto").tap(mc.abrirCamara);
		$(".tipoHabitacion").tap(fn.selectorTipoHabitacion);
		$("#reserva1 .siguiente").tap(fn.reserva1Siguiente);
		$("#reserva2 .reservar").tap(fn.realizarReservacion);
		$("#botonCerrarSesion").tap(fn.cerrarSesion);
		$("#botonIniciarSesion").tap(fn.iniciarSesion);

	},
	
	iniciarSesion: function(){
		/*
		 * 1) Obtener datos de los inputs
		 * 2) Verificar si estan vacios los inputs
		 * 3) Enviar al servidor
		 * 4) Si el servidor contesta correcto 
		 	  guardar en local storage y cambiar pantalla
		   5) Si el servidor contesta incorrecto
		      Mostrar alerta al usuario
		 */
		var emailS = $("#emailSesion").val();
		var passwordS = $("#passwordSesion").val();
		try{
			if(emailS == ""){
				throw new Error("Debe indicar su usuario");
			}
			if(passwordS == ""){
				throw new Error("Debe indicar la contraseña");
			}
			$.ajax({
			 	method: "POST",
			 	url: "http://www.colors.edu.mx/archivoTest.php",
			 	data:{
			 		emailServ : emailS,
			 		passwordServ : passwordS
			 	}
			}).done(function(mensaje){
			 	/*
			 	 *Checar respuesta del servidor
			 	 *Si se envió correctamente
			 	 *Entonces guardamos guardamos los datos localmente
			 	 */
			 	 if(mensaje == 1){
			 	 	window.localStorage.setItem("nombreUsuario", emailS);
					window.location.href="#home";
			 	 }else{
			 	 	throw new Error("Error al iniciar sesión");
			 	 }
			});
		}catch(error){
			alert(error);
		}
	},
	cerrarSesion: function(){
		window.localStorage.removeItem("nombreUsuario");
		window.location.href = "#registro";
	},

	ponerFecha: function(){
		var fecha = new Date();
		var dia = fecha.getDate();
		var mes = fecha.getMonth() + 1;
		var anio = fecha.getFullYear();
		var hoy = dia+"/"+mes+"/"+anio;
		$(".fecha").html(hoy);
	},

	realizarReservacion: function(){
		/*
		 * Obtener datos para realizar reserva
		 */
		 var reservacion = {
		 	tipoHabitacion 	: $("#reserva1").attr("tipoHabitacion"),
			numPersonas 	: $("#reserva2 select.numPersonas").val(),
			numHabitaciones : $("#reserva2 select.numHabitaciones").val(),
			numDias 		: $("#reserva2 select.numDias").val()
		 };
		 
		 
		/*
		 *Corroborar si hay conexion a internet
		 */
		if(networkInfo.estaConectado()){
			/*
			 *Si hubo conexion 
			 *Entonces enviamos los datos al servidor
			 */
			 $.ajax({
			 	method: "POST",
			 	url: "http://www.colors.edu.mx/archivoTest.php",
			 	data:{
			 		reservacionS : reservacion
			 	}
			 }).done(function(respuesta){
			 	/*
			 	 *Checar respuesta del servidor
			 	 *Si se envió correctamente
			 	 *Entonces guardamos guardamos los datos localmente
			 	 */
			 	 if(respuesta == 1){

			 	 }else{
			 	 	alert("Error al guardar reservaciòn en el servidor");
			 	 }
			 });
		}else{

		}
		/*
		 * Resetear datos del formulario
		 */
		$("#reserva1").removeAttr("tipoHabitacion");
		$(".tipoHabitacion").css("background-color", "");
		$("#reserva2 select").prop('selectedIndex',0).selectmenu("refresh", true);
		window.location.href = "#home";
	},

	reserva1Siguiente: function(){
		/*
		 * Verificar que se haya seleccionadom un tipo de habitacion
		 */
		if($("#reserva1").attr("tipoHabitacion") != undefined){
			window.location.href = "#reserva2";
		}else{
			alert("Es necesario seleccionar un tipo de habitación");
		}
	},

	selectorTipoHabitacion: function(){
		$(".tipoHabitacion").css("background-color", "");
		$(this).css("background-color", "#38C");
		$("#reserva1").attr("tipoHabitacion", $(this).text().toLowerCase());
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
		//alert("Enviando datos");
		//alert("Nombre: "+nombreR+" Email: "+emailR+" Telefono: "+telefonoR+" Password: "+passwordR+" Foto: "+fotoR);
		$.ajax({
			method: "POST",
			url: "http://www.colors.edu.mx/archivoTest.php",
			data: { 
				nombre: nombreR, 
				email: emailR,
				tel: telefonoR,
				password: passwordR
			}
		}).done(function(mensaje){
			//alert("Datos enviados");
			if(mensaje == 1){
				var fotoURL = $(fotoR).attr("src");
				file.transferir(fotoURL);
			}else{
				alert("Error al enviar datos de registro: "+mensaje);
			}
		}).fail(function(error){
			alert(error.status);
			alert(error.message);
			alert(error.responseText);
		});
	}
};
/*
 *Llamar al metodo Init en el navegador
 */
fn.init();

/*
 *Llamar deviceready para compilar
 */
//
//$(fn.deviceready());
//fn.deviceready();