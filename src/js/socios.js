// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarSocios();
    actualizarEmailDelSocio();
  });
  
  function actualizarEmailDelSocio(){
      document.getElementById('txt-email-socio').outerHTML = localStorage.email;
  }
  
  async function cargarSocios(){
    const request = await fetch('http://localhost:8080/api/socios', {
      method: 'GET',
      headers: getHeaders()
    });
    const socios = await request.json();

    let listadoHTML = '';
    let selectHTML = '';
  
    for (let socio of socios){
      let socioHTML = '<a class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="" role="tab">'+socio.nombre+' '+socio.apellido+'</a>';
      let emailHTML = '<option value="'+ socio.email +'">'+ socio.email +'</option>';
      listadoHTML += socioHTML;
      selectHTML += emailHTML;
    }

    document.querySelector('#listado-socios').outerHTML = listadoHTML;
    document.querySelector('#listado-emails').innerHTML = selectHTML;
  }
  
  function getHeaders(){
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
  }
