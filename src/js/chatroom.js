var stompClient = null;
const txtMensaje = document.getElementById('mensaje').value;
const textArea = document.getElementById('chat-textos');
const divPrivados = document.getElementById('mensajes-privados');
const escribiendoText = document.getElementById('escribiendoText');
const email = document.getElementById('txt-email-socio').value;
const socio = {
    'email': localStorage.email
};

$(document).ready(function() {
    connect();
  });
document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
document.getElementById("btnEnviarPublico").addEventListener("click", sendPublicMessage);
document.getElementById("btnEnviarPrivado").addEventListener("click", sendPrivMessage);

function connect(){
    var socket = new SockJS('http://localhost:8080/chat-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected);
}

function onConnected() {
    stompClient.subscribe('/chat/publico', function(mensaje){
        mostrarMensajePublico(JSON.parse(mensaje.body));
    });

    stompClient.send("/app/historial", {}, localStorage.email);

    stompClient.subscribe('/chat/historial/'+localStorage.email, function(listaMensajes){
        mostrarHistorial(JSON.parse(listaMensajes.body));
        console.log(JSON.parse(listaMensajes.body));
    });

    stompClient.subscribe('/chat/'+ localStorage.email +'/private', function(mensaje){
        mostrarMensajePrivado(JSON.parse(mensaje.body));
    });
}

function sendPublicMessage(){
    var mensaje = {
        'id': 'id-' + new Date().getTime(),
        'texto': document.getElementById('mensaje').value,
        'socio': socio
    }
    stompClient.send("/app/mensaje-publico", {}, JSON.stringify(mensaje));
}

function sendPrivMessage(){
    const socioReceptor = {
        'email': document.getElementById('listado-emails').value
    };
    var mensaje = {
        'id': 'id-' + new Date().getTime(),
        'texto': document.getElementById('privMensaje').value,
        'socio': socio,
        'receptor': socioReceptor
    }
    stompClient.send("/app/mensaje-privado", {}, JSON.stringify(mensaje));
}

function mostrarMensajePublico(mensaje){
    textArea.innerHTML += '<div class="alert alert-info mx-3" role="alert"><h6>'+ mensaje.socio.nombre + ' ' +  mensaje.socio.apellido +'</h6>'+ mensaje.texto +'<small class="float-right">'+ mensaje.fecha.replace('T', ' ').substring(0,19) +'</small></div>'
}

function mostrarMensajePrivado(mensaje){
    divPrivados.innerHTML += '<div class="alert alert-success alert-dismissible fade show mt-3" role="alert"><strong>'+ mensaje.socio.email +'</strong>: '+ mensaje.texto +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
}

function mostrarHistorial(listaMensajes){
    listaMensajes.forEach(mensaje => {
        textArea.innerHTML += '<div class="alert alert-info mx-3" role="alert"><h6>'+ mensaje.socio.nombre + ' ' +  mensaje.socio.apellido +'</h6>'+ mensaje.texto +'<small class="float-right">'+ mensaje.fecha.replace('T', ' ').substring(0,19) +'</small></div>'
    });
}

function cerrarSesion(){
    stompClient.disconnect();
    window.location.href = "login.html";
}