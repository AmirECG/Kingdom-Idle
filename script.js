let trabajoActivo = "Talar";

/** Datos de los trabajos */
const trabajos = {
  Talar: {
    nombre: "Talar",
    claseTarjeta: "tarjetaMadera",
    herramientaId: "hacha",
    expId: "expHacha",
    nivelId: "numNivelHacha",
    recursos: ["Roble", "Pino"],
  },
  Minar: {
    nombre: "Minar",
    claseTarjeta: "tarjetaPiedra",
    herramientaId: "pico",
    expId: "expPico",
    nivelId: "numNivelPico",
    recursos: ["Cobre", "Hierro"],
  },
};

/** Datos de las herramientas */
const herramientas = {
  hacha: { nivel: 1, xp: 0, xpNecesaria: 20 },
  pico: { nivel: 1, xp: 0, xpNecesaria: 20 },
};

/** Numero de recursos al iniciar */
const cantidadesDeRecursos = {
  MaderaRoble: 0,
  MaderaPino: 0,
  PiedraCobre: 0,
  PiedraHierro: 0,
};

/** Tipo de material para cada acción */
const accionATipo = {
  Talar: "Madera",
  Minar: "Piedra",
};

/**Actualizar la pantalla */

function actualizarPantallaHerramienta(herramientaId) {
  const herramienta = herramientas[herramientaId];
  const trabajo = Object.values(trabajos).find(
    (t) => t.herramientaId === herramientaId,
  );

  if (trabajo) {
    document.getElementById(trabajo.nivelId).textContent = herramienta.nivel;
    document.getElementById(trabajo.expId).textContent =
      `XP: ${herramienta.xp}/${herramienta.xpNecesaria}`;
  }
}

function cambiarTrabajo(nuevoTrabajo) {
  trabajoActivo = nuevoTrabajo;
  const trabajo = trabajos[nuevoTrabajo];

  /** Ocultar todas las tarjetas y herramientas */
  document
    .querySelectorAll(".tarjetaMadera, .tarjetaPiedra")
    .forEach((t) => t.classList.add("oculto"));
  document.getElementById("hacha").classList.add("oculto");
  document.getElementById("pico").classList.add("oculto");
  document.getElementById("expHacha").classList.add("oculto");
  document.getElementById("expPico").classList.add("oculto");

  /** Mostrar solo las del trabajo activo*/
  document
    .querySelectorAll(`.${trabajo.claseTarjeta}`)
    .forEach((t) => t.classList.remove("oculto"));
  document.getElementById(trabajo.herramientaId).classList.remove("oculto");
  document.getElementById(trabajo.expId).classList.remove("oculto");
}

/** Botones de recursos */

const botones = document.querySelectorAll(".boton");

botones.forEach(function (boton) {
  boton.addEventListener("click", function (event) {
    const botonClickeado = event.target;
    const accion = botonClickeado.textContent;
    const tarjeta = botonClickeado.closest(".tarjeta");
    const recurso = tarjeta.dataset.recurso;
    const tipo = accionATipo[accion];

    const idSpan = "num" + tipo + recurso;
    const clave = tipo + recurso;

    /** Actualizar cantidad */
    let cantidadActual = cantidadesDeRecursos[clave];
    cantidadActual++;
    cantidadesDeRecursos[clave] = cantidadActual;
    const span = document.getElementById(idSpan);
    span.textContent = cantidadActual;

    /** Aumentar XP */
    const herramientaId = trabajoActivo === "Talar" ? "hacha" : "pico";
    const herramienta = herramientas[herramientaId];

    if (accion === "Talar" || accion === "Minar") {
      herramienta.xp++;

      if (herramienta.xp >= herramienta.xpNecesaria) {
        herramienta.xp = herramienta.xp - herramienta.xpNecesaria;
        herramienta.nivel++;
        herramienta.xpNecesaria = Math.floor(herramienta.xpNecesaria * 1.5);
      }

      actualizarPantallaHerramienta(herramientaId);

      const imagen = tarjeta.querySelector("img");
      if (imagen) {
        imagen.style.animation = "none";
        imagen.offsetHeight; // Forzar reinicio
        imagen.style.animation = "resourceBounce 0.3s ease-in-out";
      }
    }
  });
});

/** Botones de trabajos */

Object.keys(trabajos).forEach((nombreTrabajo) => {
  const boton = document.getElementById(`trabajo${nombreTrabajo}`);
  if (boton) {
    boton.addEventListener("click", () => {
      cambiarTrabajo(nombreTrabajo);
    });
  }
});

/** Boton de guardar */

const btnGuardar = document.getElementById("btnGuardar");
if (btnGuardar) {
  btnGuardar.addEventListener("click", function () {
    guardarPartida();
    alert("Partida guardada");
  });
}

function guardarPartida() {
  const datosPartida = {
    recursos: cantidadesDeRecursos,
    herramientas: herramientas,
    trabajoActivo: trabajoActivo,
  };

  const datosTexto = JSON.stringify(datosPartida);
  localStorage.setItem("JuegoIncremental", datosTexto);
}

/**Cargar partida */
function cargarPartida() {
  const datosTexto = localStorage.getItem("JuegoIncremental");

  if (datosTexto === null) {
    return;
  }

  const datosPartida = JSON.parse(datosTexto);

  Object.assign(cantidadesDeRecursos, datosPartida.recursos);

  Object.assign(herramientas, datosPartida.herramientas);

  trabajoActivo = datosPartida.trabajoActivo;

  /** Actualizar pantalla */
  Object.keys(cantidadesDeRecursos).forEach((clave) => {
    const idSpan = "num" + clave;
    const span = document.getElementById(idSpan);
    if (span) span.textContent = cantidadesDeRecursos[clave];
  });

  actualizarPantallaHerramienta("hacha");
  actualizarPantallaHerramienta("pico");
}

/** Pagina de inicio */

function inicializarPantalla() {
  cargarPartida();
  cambiarTrabajo(trabajoActivo);
}

inicializarPantalla();
