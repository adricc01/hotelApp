var networkInfo = {
	estaConectado: function(){
		//return false;
		if(navigator.connection.type != Connection.NONE){
			return true;
		}
		return false;
	}
};