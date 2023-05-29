document.getElementById("btnRegistrar").addEventListener("click", registrarSocio);

async function registrarSocio() {
  const datos = {};
  datos.id = new Date().getTime();
  datos.nombre = document.getElementById('nombre').value;
  datos.apellido = document.getElementById('apellidos').value;
  datos.email = document.getElementById('email').value;
  datos.password = document.getElementById('pass').value;
  const repetirPassword = document.getElementById('repPass').value;
  let valido = true;
  if (!datos.nombre) {
    document.querySelector('.error-nombre').textContent = 'El nombre no puede estar vacio';
    valido = false;
  } else {
    document.querySelector('.error-nombre').textContent = '';
    valido = true;
  }
  if (!datos.apellido) {
    document.querySelector('.error-apellidos').textContent = 'El apellido no puede estar vacio';
    valido = false;
  } else {
    document.querySelector('.error-nombre').textContent = '';
    valido = true;
  }
  if (!datos.email) {
    document.querySelector('.error-email').textContent = 'El email no puede estar vacio';
    valido = false;
  } else {
    document.querySelector('.error-nombre').textContent = "";
    valido = true;
  }
  if (!datos.password) {
    document.querySelector('.error-contraseña').textContent = "La contraseña no puede estar vacia";
    valido = false;
  } else {
    document.querySelector('.error-nombre').textContent = "";
    valido = true;
  }

  if (repetirPassword !== datos.password) {
    Swal.fire(
      'Error',
      'Las contraseñas no coinciden',
      'error',
    );
    valido = false;
  } else {
    valido = true;
  }

  if (valido) {
    const request = await fetch('http://localhost:8080/api/registro', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    }).then(response => {
      console.log(response);
      return response.json();
    })
      .then(data => {
        console.log(data);
        window.location.href = "login.html";
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
