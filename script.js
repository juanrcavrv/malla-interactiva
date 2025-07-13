// script.js

const malla = [
  {
    semestre: "Semestre I",
    ramos: [
      { nombre: "Química general I y Laboratorio", id: "qg1", abre: ["qg2", "qo1"] },
      { nombre: "Lógica y argumentación", id: "log" },
      { nombre: "Álgebra y funciones", id: "alg", abre: ["cal1", "eco", "aq"] },
      { nombre: "Comunicación escrita I", id: "com1", abre: ["com2"] },
      { nombre: "Biología general y Laboratorio", id: "bio1" }
    ]
  },
  {
    semestre: "Semestre II",
    ramos: [
      { nombre: "Química general II y Laboratorio", id: "qg2", abre: ["aq"] },
      { nombre: "Cálculo una variable", id: "cal1", abre: ["fis", "calcn", "bioest"] },
      { nombre: "Introducción a las Ciencias farmacéuticas", id: "intro" },
      { nombre: "Química orgánica I y Laboratorio", id: "qo1", abre: ["qo2", "bioq"] },
      { nombre: "Comunicación oral y escrita II", id: "com2", abre: ["lid", "hum1", "hum2", "hum3"] },
      { nombre: "Organizaciones", id: "org" }
    ]
  },
  {
    semestre: "Semestre III",
    ramos: [
      { nombre: "Bioquímica y Laboratorio", id: "bioq", abre: ["biocel", "anat"] },
      { nombre: "Física y Laboratorio", id: "fis", abre: ["fisq1"] },
      { nombre: "Análisis químico y Laboratorio", id: "aq", abre: ["ai"] },
      { nombre: "Cálculo CN", id: "calcn", abre: ["fisq1", "ai", "disexp"] },
      { nombre: "Principios de Economía", id: "eco" }
    ]
  },
  {
    semestre: "Semestre IV",
    ramos: [
      { nombre: "Liderazgo", id: "lid" },
      { nombre: "Bioestadística", id: "bioest", abre: ["salpub", "disexp"] },
      { nombre: "Fundamentos de Derecho Constitucional", id: "dercon" },
      { nombre: "Fisicoquímica I y Laboratorio", id: "fisq1", abre: ["fisq2"] },
      { nombre: "Biología celular-Conceptos y experimentos", id: "biocel", abre: ["micro", "mol"] },
      { nombre: "Química orgánica II y Laboratorio", id: "qo2", abre: ["fitoq"] }
    ]
  },
  {
    semestre: "Semestre V",
    ramos: [
      { nombre: "Diseño de experimentos", id: "disexp", abre: ["biofar", "biotec"] },
      { nombre: "Microbiología y Laboratorio", id: "micro", abre: ["ctrl"] },
      { nombre: "Anatomía y Fisiología Humana y Laboratorio", id: "anat", abre: ["biofar", "farm1"] },
      { nombre: "Fisicoquímica II y Laboratorio", id: "fisq2", abre: ["farmtec1"] },
      { nombre: "Análisis instrumental y Laboratorio", id: "ai", abre: ["fitoq"] },
      { nombre: "Salud pública y administración", id: "salpub", abre: ["asist"] }
    ]
  },
  {
    semestre: "Semestre VI",
    ramos: [
      { nombre: "Biología Molecular", id: "mol", abre: ["biotec"] },
      { nombre: "Farmacotecnia I y Laboratorio", id: "farmtec1", abre: ["farmtec2", "ctrl", "asist", "pg1", "aud"] },
      { nombre: "Farmacognosia y fitoquímica y Laboratorio", id: "fitoq", abre: ["ctrl", "pg1"] },
      { nombre: "Farmacología I", id: "farm1", abre: ["asist", "farm2"] },
      { nombre: "Biofarmacia, Farmacocinética y Laboratorio", id: "biofar" },
      { nombre: "Electiva en Ética", id: "etica" }
    ]
  },
  {
    semestre: "Semestre VII",
    ramos: [
      { nombre: "Biotecnología y Laboratorio", id: "biotec" },
      { nombre: "Farmacotecnia II", id: "farmtec2", abre: ["farmind"] },
      { nombre: "Control fisicoquímico y microbiológico y Laboratorio", id: "ctrl" },
      { nombre: "Farmacia asistencial y práctica", id: "asist", abre: ["pg1", "clin"] },
      { nombre: "Farmacología II", id: "farm2" },
      { nombre: "Electiva en Ciencia, tecnología y sociedad", id: "cts" }
    ]
  },
  {
    semestre: "Semestre VIII",
    ramos: [
      { nombre: "Electiva en Humanidades y Ciencias sociales I", id: "hum1" },
      { nombre: "Farmacia clínica y Práctica", id: "clin" },
      { nombre: "Farmacia industrial y Laboratorio", id: "farmind" },
      { nombre: "Proyecto de grado I: gestión de proyectos de Investigación", id: "pg1", abre: ["pg2"] },
      { nombre: "Profesional electiva I", id: "prof1" },
      { nombre: "Asuntos regulatorios y auditorías", id: "aud" }
    ]
  },
  {
    semestre: "Semestre IX",
    ramos: [
      { nombre: "Electiva en Humanidades y Ciencias sociales II", id: "hum2" },
      { nombre: "Electiva en Humanidades y Ciencias sociales III", id: "hum3" },
      { nombre: "Proyecto de grado II", id: "pg2" },
      { nombre: "Profesional electiva II", id: "prof2" },
      { nombre: "Profesional electiva III", id: "prof3" }
    ]
  },
  {
    semestre: "Semestre X",
    ramos: [
      { nombre: "Práctica Profesional", id: "pp" }
    ]
  }
];

const contenedor = document.getElementById("contenedor-malla");
const estadoRamos = {};

function crearMalla() {
  malla.forEach(bloque => {
    const divSemestre = document.createElement("div");
    divSemestre.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = bloque.semestre;
    divSemestre.appendChild(titulo);

    bloque.ramos.forEach(ramo => {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo";

      const boton = document.createElement("button");
      boton.textContent = ramo.nombre;
      boton.id = ramo.id;
      boton.disabled = !sinRequisitos(ramo.id);

      boton.onclick = () => {
        boton.classList.toggle("aprobado");
        estadoRamos[ramo.id] = boton.classList.contains("aprobado");
        actualizarBotones();
      };

      divRamo.appendChild(boton);
      divSemestre.appendChild(divRamo);
    });

    contenedor.appendChild(divSemestre);
  });
}

function sinRequisitos(id) {
  return !malla.some(sem => sem.ramos.some(r => (r.abre || []).includes(id)));
}

function actualizarBotones() {
  malla.forEach(sem => {
    sem.ramos.forEach(ramo => {
      const boton = document.getElementById(ramo.id);
      if (!boton) return;

      if (estadoRamos[ramo.id]) {
        boton.disabled = false;
        boton.classList.add("aprobado");
        return;
      }

      const requisitos = malla
        .flatMap(s => s.ramos)
        .filter(r => (r.abre || []).includes(ramo.id));

      const habilitado = requisitos.every(r => estadoRamos[r.id]);
      boton.disabled = !habilitado;
    });
  });
}

crearMalla();

