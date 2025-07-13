const cursos = [
  { nombre: "Química general I y Laboratorio", id: "qg1", abre: ["qg2", "qo1"] },
  { nombre: "Lógica y argumentación", id: "log" },
  { nombre: "Álgebra y funciones", id: "alg", abre: ["calc1", "eco", "aq"] },
  { nombre: "Comunicación escrita I", id: "com1", abre: ["com2"] },
  { nombre: "Biología general y Laboratorio", id: "bio1" },
  { nombre: "Química general II y Laboratorio", id: "qg2", prereq: ["qg1"], abre: ["aq"] },
  { nombre: "Cálculo una variable", id: "calc1", prereq: ["alg"], abre: ["fis", "ccn", "bioest"] },
  { nombre: "Introducción a las Ciencias farmacéuticas", id: "intro" },
  { nombre: "Química orgánica I y Laboratorio", id: "qo1", prereq: ["qg1"], abre: ["qo2", "bioq"] },
  { nombre: "Comunicación oral y escrita II", id: "com2", prereq: ["com1"], abre: ["lid", "hum1", "hum2", "hum3"] },
  { nombre: "Organizaciones", id: "org" },
  { nombre: "Bioquímica y Laboratorio", id: "bioq", prereq: ["qo1"], abre: ["cel", "anat"] },
  { nombre: "Física y Laboratorio", id: "fis", prereq: ["calc1"], abre: ["fq1"] },
  { nombre: "Análisis químico y Laboratorio", id: "aq", prereq: ["qg2", "alg"], abre: ["ai"] },
  { nombre: "Cálculo CN", id: "ccn", prereq: ["calc1"], abre: ["fq1", "ai", "dis"] },
  { nombre: "Principios de Economía", id: "eco", prereq: ["alg"] },
  { nombre: "Liderazgo", id: "lid", prereq: ["com2"] },
  { nombre: "Bioestadística", id: "bioest", prereq: ["calc1"], abre: ["salud", "dis"] },
  { nombre: "Fundamentos de Derecho Constitucional", id: "der" },
  { nombre: "Fisicoquímica I y Laboratorio", id: "fq1", prereq: ["fis", "ccn"], abre: ["fq2"] },
  { nombre: "Biología celular", id: "cel", prereq: ["bioq"], abre: ["mic", "mol"] },
  { nombre: "Química orgánica II y Laboratorio", id: "qo2", prereq: ["qo1"], abre: ["farmacog"] },
  { nombre: "Diseño de experimentos", id: "dis", prereq: ["ccn", "bioest"], abre: ["biofarm", "biotec"] },
  { nombre: "Microbiología y Laboratorio", id: "mic", prereq: ["cel"], abre: ["control"] },
  { nombre: "Anatomía y Fisiología Humana", id: "anat", prereq: ["bioq"], abre: ["biofarm", "farm1"] },
  { nombre: "Fisicoquímica II y Laboratorio", id: "fq2", prereq: ["fq1"], abre: ["ft1"] },
  { nombre: "Análisis instrumental y Laboratorio", id: "ai", prereq: ["aq", "ccn"], abre: ["farmacog"] },
  { nombre: "Salud pública y administración", id: "salud", prereq: ["bioest"], abre: ["asist"] },
  { nombre: "Biología Molecular", id: "mol", prereq: ["cel"], abre: ["biotec"] },
  { nombre: "Farmacotecnia I y Laboratorio", id: "ft1", prereq: ["fq2"], abre: ["ft2", "control", "asist", "pg1"] },
  { nombre: "Farmacognosia y fitoquímica", id: "farmacog", prereq: ["qo2", "ai"], abre: ["control", "pg1"] },
  { nombre: "Farmacología I", id: "farm1", prereq: ["anat"], abre: ["asist", "farm2"] },
  { nombre: "Biofarmacia, Farmacocinética y Laboratorio", id: "biofarm", prereq: ["dis", "anat"] },
  { nombre: "Electiva en Ética", id: "etica" },
  { nombre: "Biotecnología y Laboratorio", id: "biotec", prereq: ["dis", "mol"] },
  { nombre: "Farmacotecnia II", id: "ft2", prereq: ["ft1"], abre: ["industrial"] },
  { nombre: "Control fisicoquímico y microbiológico", id: "control", prereq: ["mic", "farmacog", "ft1"] },
  { nombre: "Farmacia asistencial y práctica", id: "asist", prereq: ["salud", "farm1", "ft1"], abre: ["pg1", "clinica"] },
  { nombre: "Farmacología II", id: "farm2", prereq: ["farm1"] },
  { nombre: "Electiva en Ciencia, tecnología y sociedad", id: "cts" },
  { nombre: "Electiva en Humanidades y Ciencias sociales I", id: "hum1" },
  { nombre: "Farmacia clínica y Práctica", id: "clinica", prereq: ["asist"] },
  { nombre: "Farmacia industrial y Laboratorio", id: "industrial", prereq: ["ft2"] },
  { nombre: "Proyecto de grado I", id: "pg1", prereq: ["farmacog", "ft1", "asist"], abre: ["pg2"] },
  { nombre: "Asuntos regulatorios y auditorías", id: "reg" },
  { nombre: "Electiva en Humanidades y Ciencias sociales II", id: "hum2" },
  { nombre: "Electiva en Humanidades y Ciencias sociales III", id: "hum3" },
  { nombre: "Proyecto de grado II", id: "pg2", prereq: ["pg1"] },
  { nombre: "Profesional electiva II", id: "elec2" },
  { nombre: "Profesional electiva III", id: "elec3" },
  { nombre: "Práctica Profesional", id: "prac" }
];

function crearMalla() {
  const contenedor = document.getElementById("malla");

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.classList.add("curso");
    div.textContent = curso.nombre;
    div.id = curso.id;
    if (curso.prereq) div.classList.add("bloqueado");
    div.onclick = () => aprobarCurso(curso);
    contenedor.appendChild(div);
  });
}

function aprobarCurso(curso) {
  const div = document.getElementById(curso.id);
  div.classList.toggle("activo");
  if (!div.classList.contains("activo")) return;

  cursos.forEach(c => {
    if (!c.prereq) return;
    const cursoDiv = document.getElementById(c.id);
    const desbloqueado = c.prereq.every(pr => document.getElementById(pr).classList.contains("activo"));
    if (desbloqueado) cursoDiv.classList.remove("bloqueado");
  });
}

crearMalla();
