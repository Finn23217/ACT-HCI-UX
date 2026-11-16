const botonMenu = document.querySelector('#boton-menu');
const navegacion = document.querySelector('#navegacion');
const textoMenu = document.querySelector('#texto-menu');
const submenu = document.querySelector('#resolver');
const pantallaMovil = window.matchMedia('(max-width: 600px)');

function cambiarMenu(abrir) {
  navegacion.hidden = pantallaMovil.matches && !abrir;
  botonMenu.setAttribute('aria-expanded', String(abrir));
  botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  textoMenu.textContent = abrir ? 'Cerrar' : 'Menú';
  if (!abrir) { submenu.open = false; }
}

if (botonMenu) {
  botonMenu.addEventListener('click', function () {
    const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
    cambiarMenu(!estaAbierto);
  });
}

if (navegacion) {
  navegacion.addEventListener('click', function (evento) {
    const enlace = evento.target.closest('a');
    if (!enlace) return;
    cambiarMenu(false);
    const ruta = enlace.getAttribute('href');
    const destino = ruta.startsWith('#') ? document.querySelector(ruta) : null;
    if (destino) { destino.focus({ preventScroll: true }); }
  });
}

const marca = document.querySelector('.marca');
if (marca) {
  marca.addEventListener('click', function () {
    cambiarMenu(false);
    const inicio = document.querySelector('#inicio');
    if (inicio) inicio.focus({ preventScroll: true });
  });
}

document.addEventListener('keydown', function (evento) {
  if (evento.key !== 'Escape') return;
  if (pantallaMovil.matches && navegacion && !navegacion.hidden) {
    cambiarMenu(false);
    if (botonMenu) botonMenu.focus();
  } else if (submenu && submenu.open) {
    submenu.open = false;
    const summary = submenu.querySelector('summary');
    if (summary) summary.focus();
  }
});

function ajustarPantalla() {
  if (!navegacion || !botonMenu) return;
  const focoEstabaEnNavegacion = navegacion.contains(document.activeElement);
  const focoEstabaEnBoton = document.activeElement === botonMenu;
  cambiarMenu(false);
  if (pantallaMovil.matches && focoEstabaEnNavegacion) {
    botonMenu.focus();
  } else if (!pantallaMovil.matches && focoEstabaEnBoton) {
    const primerEnlace = navegacion.querySelector('a');
    if (primerEnlace) primerEnlace.focus();
  }
}
pantallaMovil.addEventListener('change', ajustarPantalla);
ajustarPantalla();

// ==========================================
// LÓGICA PARA HU-C: REGISTRO DE ENVASES DE PLÁSTICO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  const formEnvases = document.getElementById('form-registro-envases');
  const inputCantidad = document.getElementById('cantidad-envases');
  const spanTotal = document.getElementById('total-diario');
  const divError = document.getElementById('mensaje-error-envases');
  const divExito = document.getElementById('mensaje-exito-envases');

  let totalDiario = 0;

  if (formEnvases) {
    formEnvases.addEventListener('submit', function(e) {
      e.preventDefault();
      divError.textContent = '';
      divExito.textContent = '';

      const valor = inputCantidad.value.trim();
      const cantidad = parseInt(valor, 10);

      // Unhappy path: campo vacío o valor inválido / menor o igual a 0
      if (valor === '' || isNaN(cantidad) || cantidad <= 0) {
        divError.textContent = 'Por favor, ingresa un número válido mayor a 0.';
        inputCantidad.focus();
        return;
      }

      // Happy path: acumular y actualizar
      totalDiario += cantidad;
      spanTotal.textContent = totalDiario;
      divExito.textContent = `¡Se registraron ${cantidad} envase(s) correctamente! Total acumulado hoy: ${totalDiario}.`;
      
      // Limpiar input y preparar siguiente ingreso
      inputCantidad.value = '';
      inputCantidad.focus();
    });
  }
});