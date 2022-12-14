window.onload=function(){ 
   
    var form=document.getElementById("formulario")
    document.getElementById("input-nombre").focus();
    formulario.reset();

        form.addEventListener("submit", e =>{

        const inputNombre =document.getElementById("input-nombre").value;
        const inputMail=document.getElementById("input-correo").value;
        const inputMensaje=document.getElementById("input-textarea").value;
        const mensajeValido=inputMensaje.toString();
                    
        e.preventDefault();

        function verificarNombre(){
            
            if(inputNombre.length<3||inputNombre.length==""){
                document.getElementById("error-nombre").style.display ="block";
                rojo("nombre");  
                document.getElementById("error-nombre").style.display ="block";
                rojo("nombre");
                return false;        
            }else if(!isNaN(inputNombre)){
                document.getElementById("error-nombre").style.display ="block";
                rojo("nombre");   
                return false;     
            }else{
                document.getElementById("valido-nombre").style.display="block";
                verde("nombre");
                nombreValido=inputNombre.toString();   
                return true;
            } 
        }  

        function verificarCorreo(){
            
            var regexEmail= /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
            if(!regexEmail.test(inputMail)){
                alert("entrar un mail valido");
                document.getElementById("error-correo").style.display ="block";
                rojo("correo");
            }else{
                document.getElementById("valido-correo").style.display ="block";
                verde("correo");
                console.log("Email es ==> "+inputMail);
                correoValido=inputMail.toString();
                return true;
            }
        }

        if ( verificarNombre() && verificarCorreo()){
            window.open(`mailto:massadale@hotmail.com?subject=Consulta de ${nombreValido}&body=${mensajeValido}`);    
    
        }else{
            e.preventDefault();
        }        
    })

    function rojo(e){
        document.getElementById("input-"+e).style.background = "rgb(255, 4, 2, 0.5)";
        document.getElementById("valido-"+e).style.display ="none";
    }
    function verde(e){
        document.getElementById("input-"+e).style.background = "rgb(157, 230, 188, 0.7)";
        document.getElementById("error-"+e).style.display="none";
    }
}
