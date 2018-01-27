/**
 * Singleton with the client side code for the chat app
 */
var chat = (function(){
    var socket;
    var instance = {};

    /**
     * Shows the chat form and waits for new messages
     */
    function inicializar(){

        if(!$("#nuevonombre").val()) {
            return;
        }

        $("#nombre").val( $("#nuevonombre").val() );
        $("#login").hide(700);
        $("#container").show(700);
        $("#mimensaje").focus();
        
        socket = io.connect('http://' + ipServidorChatNodeJs + ':' + portServidorChatNodeJs );
        socket.on('news', function (data) {
            document.getElementById("mensajes").innerHTML = document.getElementById("mensajes").innerHTML + "<p>" + data + "</p>";
            $("#mensajes").animate({scrollTop: $("#mensajes")[0].scrollHeight});
        });
        
        socket.emit('nuevomsj', "- " + $("#nombre").val() + " ha ingresado a la conversación!"); 
        
        $("#mensajes").html("<p>Bienvenido " + $("#nombre").val() + "</p>");
    }

    /**
     * Emits a message
     */
    function emitir(){
        try{ 
            if(!$("#nombre").val()) {
                alert("Ingrese un nombre.");
                return;
            }

            if(!$("#mimensaje").val()) { 
                return; 
            }

            var mimensaje = "<em>" + $("#nombre").val() + " dice</em>: " + $("#mimensaje").val();
            $("#mimensaje").val("");

            socket.emit('nuevomsj', mimensaje); 

        }catch(e){ 
            alert(e);
        }
    }

    /**
     * Shows the login form and sets the corresponding event handlers
     */
    instance.init = function(){
        //$.mobile.changePage('#login', 'pop', false, true);
        
        $("#nuevonombre").on("keypress", function(e){
            if(e.keyCode == 13) {
                inicializar();
            }
        });

        $("#login_button").click(inicializar);

        $("#mimensaje").on("keypress", function(e){
            if(e.keyCode == 13) {
                emitir();   
            }
        });

        $("#chat_button").click(emitir);

        $("#nuevonombre").focus();
    }

    return instance;
})();