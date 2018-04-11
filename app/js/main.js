var x;
x = $(document);
x.ready(inicializar);  

function inicializar()
{
    var x = $("#send");
    x.click(send);
}


// Invoca el servicio para enviar el email

function send()
{

    var name 		= $("#name").val();
    var email 		= $("#email").val();
    var telephone 	= $("#telephone").val();
    var city 		= $("#city").val();
    var subject 	= $("#subject").val();
    var message 	= $("#message").val();


    // Validacion de los datos del usuario

    if ( name == "" || telephone == "" || subject == "" || message == "" || validateEmail(email) == false ) {
    	return ;
    }


    $.ajax({
        async:true,
        type: "POST",
        dataType: "html",
        contentType: "application/x-www-form-urlencoded",
        url:"app/services/send_email.php",
        data:
        	"name=" + name + 
        	"&email=" + email + 
        	"&telephone=" + telephone +
        	"&city=" + city +
        	"&subject=" + subject +
        	"&message=" + message, 

        beforeSend:inicioEnvio,
        success: llegada,
        error: problemas
    });

    

    // Limpia todos los campos de formulario
    document.getElementById("form_contact").reset();


    return false;
}  



// Preloader

function inicioEnvio()
{
    $("#loader").addClass("loader"); 
}      




// Muestra confirmacion/error al usuario      

function llegada(datos)
{

	switch(datos) {
	    
	    // 0: Error de envio de tipo interno, falla con SENGRID, servidor, etc.

	    case '0':
		    var response = '<div class="alert alert-danger alert-dismissible" role="alert">  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error! </strong>Ha ocurrido un error, su mensaje no se ha enviado. Por favor intente de nuevo.</div>';
		    $("#resultado").html(response); 
	        break;


	    // 1: Envio satisfactorio

	    case '1':
		    var response = '<div class="alert alert-info alert-dismissible" role="alert">  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Gracias por escribirnos. Pronto te contactaremos. </div>';
		    $("#resultado").html(response);
	        break;    


		// 2: Error de validacion, datos invalidos proporcionado por el usuario
	    
	    case '2':
		    var response = '<div class="alert alert-danger alert-dismissible" role="alert">  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error! </strong>Ha ocurrido un error de validacion, por favor verifique sus datos.</div>';
		    $("#resultado").html(response);
	        break;

	}

	$("#loader").removeClass("loader");

}      



// Problemas estableciendo conexion con el servidor                   

function problemas()
{
    var response_success = '<div class="alert alert-danger alert-dismissible" role="alert">  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error! </strong>No se ha podido establecer conexion con el servidor</div>';
    $("#resultado").html(response_success)  
}            
 


function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

