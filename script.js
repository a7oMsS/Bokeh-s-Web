
const ACCESS_CODE = "LJOSSTEINN";                      
const ITCH_URL = "https://a7omss.itch.io/bokehs-game";
const ITCH_PASSWORD = "VIGNETTE150826";           
const LAUNCH_DATE = "2026-08-11T00:00:00"; 
// ============================================================
const tooEarlySection = document.getElementById("too-early");
const gateSectionEl = document.getElementById("gate");

if (tooEarlySection && gateSectionEl && new Date() < new Date(LAUNCH_DATE)) {
  gateSectionEl.hidden = true;
  tooEarlySection.hidden = false;
  const dateDisplay = document.getElementById("launch-date-display");
  if (dateDisplay) {
    dateDisplay.textContent = new Date(LAUNCH_DATE).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Target your element
  const element = document.querySelectorAll(".tier-1");
  const delayInMilliseconds = 7000; 

  setTimeout(() => {
  // Add the CSS class
  element.forEach(element => {
        if (element) {
      element.classList.add("appear");
    }
  });
  });

});


function submitToNetlify(form) {
  const data = new URLSearchParams(new FormData(form)).toString();
  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data,
  });
}

// ---------- index.html: gate + registro ----------

const gateForm = document.getElementById("gate-form");

if (gateForm) {
  const gateError = document.getElementById("gate-error");
  const gateSection = document.getElementById("gate");
  const registroSection = document.getElementById("registro");
  const accesoSection = document.getElementById("acceso");
  const registroForm = document.getElementById("registro-form");
  const registroError = document.getElementById("registro-error");
  const itchLink = document.getElementById("itch-link");
  const itchPass = document.getElementById("itch-pass");

  gateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("access-code").value.trim();

    if (input.toUpperCase() === ACCESS_CODE.toUpperCase()) {
      gateError.hidden = true;
      gateSection.hidden = true;
      registroSection.hidden = false;
      document.body.dataset.stage = "registering";
      document.getElementById("nombre").focus();
    } else {
      gateError.hidden = false;
      gateForm.classList.remove("shake");
      void gateForm.offsetWidth;
      gateForm.classList.add("shake");
    }
  });

  registroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    registroError.hidden = true;

    submitToNetlify(registroForm)
      .then((res) => {
        if (!res.ok) throw new Error("network");
        registroSection.hidden = true;
        itchLink.href = ITCH_URL;
        itchLink.textContent = ITCH_URL;
        itchPass.textContent = ITCH_PASSWORD;
        accesoSection.hidden = false;
        document.body.dataset.stage = "unlocked";
      })
      .catch(() => {
        registroError.textContent =
          "No se pudo enviar el registro. Revisa tu conexión e inténtalo de nuevo.";
        registroError.hidden = false;
      });
  });
}

// ---------- feedback.html ----------

const feedbackForm = document.getElementById("feedback-form");

if (feedbackForm) {
  const feedbackSection = document.getElementById("feedback");
  const graciasSection = document.getElementById("feedback-gracias");
  const feedbackError = document.getElementById("feedback-error");

  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    feedbackError.hidden = true;

    submitToNetlify(feedbackForm)
      .then((res) => {
        if (!res.ok) throw new Error("network");
        feedbackSection.hidden = true;
        graciasSection.hidden = false;
      })
      .catch(() => {
        feedbackError.textContent =
          "No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.";
        feedbackError.hidden = false;
      });
  });
}

// ---------- colabora.html ----------
const colaboraForm = document.getElementById("colabora-form");

if (colaboraForm) {
  const colaboraError = document.getElementById("colabora-error");
  const colaboraSection = document.getElementById("colabora");
  const colaboraGracias = document.getElementById("colabora-gracias");

  colaboraForm.addEventListener("submit", (e) => {
    e.preventDefault();
    colaboraError.hidden = true;

    const habilidadesMarcadas = colaboraForm.querySelectorAll('input[name="habilidades"]:checked').length;
    const otroTexto = document.getElementById("colab-otro").value.trim();
    if (habilidadesMarcadas === 0 && otroTexto === "") {
      colaboraError.textContent = 'Selecciona al menos una habilidad, o descríbela en "otro".';
      colaboraError.hidden = false;
      return;
    }

    submitToNetlify(colaboraForm)
      .then((res) => {
        if (!res.ok) throw new Error("network");
        colaboraSection.hidden = true;
        colaboraGracias.hidden = false;
      })
      .catch(() => {
        colaboraError.textContent = "No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.";
        colaboraError.hidden = false;
      });
  });
}