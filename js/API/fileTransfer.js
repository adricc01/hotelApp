var file = {
	exito: function(){
		window.location.href="#home";
	},

	error: function(){

	},

	transferir: function(fileURL){
		var options = new FileUploadOptions();
		options.fileKey = "foto";
		options.fileName = "miFoto";
		options.mimeType = "image/jpeg";
		var ft = new FileTransfer();
		ft.upload(fileURL, "", file.exito, file.error, options);
	}
}