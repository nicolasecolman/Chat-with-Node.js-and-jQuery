/**
 * Singleton with the client side code for the chat app
 */
 /*global $*/
 /*global io*/
 /*global ipServidorChatNodeJs*/
 /*global portServidorChatNodeJs*/
var chat = (function () {
    "use strict";
    var socket;
    var instance = {};

    /**
     * Shows the chat form, connects to server and waits for new messages
     */
    function inicializar() {

        if (!$("#nuevonombre").val()) {
            return;
        }

        $("#nombre").text($("#nuevonombre").val());
        $("#login").hide(700);
        $("#container").show(700);
        $("#mimensaje").focus();
        $("#mensajes").html("<p>Bienvenido " + $("#nombre").text() + "!</p>");

        socket = io.connect("http://" + ipServidorChatNodeJs + ":" + portServidorChatNodeJs);

        socket.emit("nuevomsj", "- " + $("#nombre").text() + " ha ingresado a la conversación.");

        socket.on("news", function (data) {
            $("#mensajes").append("<p>" + data + "</p>");
            $("#mensajes").animate({scrollTop: $("#mensajes")[0].scrollHeight});
        });

    }

    /**
     * Emits a message
     */
    function emitir() {
        try {

            if (!$("#mimensaje").val()) {
                return;
            }

            var mimensaje = "<em>" + $("#nombre").text() + " dice</em>: " + $("#mimensaje").val();
            $("#mimensaje").val("");

            socket.emit("nuevomsj", mimensaje);

        } catch (e) {
            throw e;
        }
    }

    /**
     * Shows the login form and sets the corresponding event handlers
     */
    instance.init = function () {

        $("#nuevonombre").keypress(function (e) {
            if (e.keyCode === 13) {
                inicializar();
            }
        });

        $("#login_button").click(inicializar);

        $("#mimensaje").keypress(function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                emitir();
            }
        });

        $("#chat_button").click(emitir);

        $("#nuevonombre").focus();
    };

    return instance;
}());