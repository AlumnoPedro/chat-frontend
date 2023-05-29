document.getElementById("btnIniciarSesion").addEventListener("click", iniciarSesion);
async function iniciarSesion(){
let datos = {};
datos.email = document.getElementById('email').value;
datos.password = document.getElementById('pass').value;

  const request = await fetch("http://localhost:8080/api/login", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  const respuesta = await request.text();

  if(respuesta != "fail"){
  console.log(respuesta);
    localStorage.token = respuesta;
    localStorage.email = datos.email;
    window.location.href = "chatroom.html";
  } else {
    Swal.fire(
      'Error',
      'Las credenciales son incorrectas!',
      'error'
    )    
  }

}