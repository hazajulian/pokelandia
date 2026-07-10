// Contact.jsx
// Página de contacto del proyecto.

import { useState } from "react";

import {
  FaDiscord,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";

import { Toast } from "../../components/Toast/Toast";

import "./Contact.css";

const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL;

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
};

const INITIAL_TOAST = {
  open: false,
  type: "info",
  title: "",
  message: "",
};

export function Contact() {
  const [form, setForm] =
    useState(INITIAL_FORM);

  const [toast, setToast] =
    useState(INITIAL_TOAST);

  const [isSending, setIsSending] =
    useState(false);

  function handleChange(event) {
    const { name, value } =
      event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!form.name.trim()) {
      return "Completa tu nombre.";
    }

    if (!form.email.trim()) {
      return "Completa tu correo electrónico.";
    }

    if (!form.email.includes("@")) {
      return "Ingresa un correo electrónico válido.";
    }

    if (!form.message.trim()) {
      return "Escribe un mensaje antes de enviarlo.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setToast({
        open: true,
        type: "error",
        title: "Formulario incompleto",
        message: validationError,
      });

      return;
    }

    if (!CONTACT_EMAIL) {
      setToast({
        open: true,
        type: "error",
        title: "Correo no configurado",
        message:
          "Falta configurar VITE_CONTACT_EMAIL en el archivo .env.",
      });

      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Accept:
              "application/json",
          },
          body: JSON.stringify({
            _subject:
              "Nuevo mensaje desde PokéLandia",
            _template: "table",
            _captcha: "false",
            Nombre:
              form.name.trim(),
            Email:
              form.email.trim(),
            Mensaje:
              form.message.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "No se pudo enviar el mensaje."
        );
      }

      setForm(INITIAL_FORM);

      setToast({
        open: true,
        type: "success",
        title: "Mensaje enviado",
        message:
          "Tu mensaje fue enviado correctamente. Gracias por comunicarte.",
      });
    } catch (error) {
      setToast({
        open: true,
        type: "error",
        title: "No se pudo enviar",
        message:
          error.message ||
          "Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.",
      });
    } finally {
      setIsSending(false);
    }
  }

  function handleCloseToast() {
    setToast((currentToast) => ({
      ...currentToast,
      open: false,
    }));
  }

  return (
    <main className="contact page">
      <div className="contact__container container">
        <header className="contact__header animate-fade-in-up">
          <span className="contact__eyebrow">
            <FaEnvelope aria-hidden="true" />
            Contacto
          </span>

          <h1 className="page__title">
            ¿Encontraste un error o tienes una idea?
          </h1>

          <p className="page__description">
            Este proyecto es una Pokédex creada con React
            consumiendo la PokéAPI. Si quieres reportar un
            problema, proponer una mejora o simplemente dejar
            un comentario, puedes escribirme utilizando este
            formulario.
          </p>
        </header>

        <div className="contact__content">
          <section className="contact__formCard surface">
            <h2>
              Enviar mensaje
            </h2>

            <p>
              Completa el formulario y el mensaje será enviado
              directamente sin abrir una aplicación de correo.
            </p>

            <form
              className="contact__form"
              onSubmit={handleSubmit}
            >
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Nombre"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                disabled={isSending}
              />

              <input
                className="input"
                type="email"
                name="email"
                placeholder="Correo electrónico"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                disabled={isSending}
              />

              <textarea
                className="textarea"
                name="message"
                placeholder="Escribe tu mensaje..."
                value={form.message}
                onChange={handleChange}
                disabled={isSending}
              />

              <button
                type="submit"
                className="button button--primary"
                disabled={isSending}
              >
                <FaPaperPlane aria-hidden="true" />

                {isSending
                  ? "Enviando..."
                  : "Enviar mensaje"}
              </button>
            </form>
          </section>

          <aside className="contact__info surface">
            <div>
              <h3>
                Sobre el proyecto
              </h3>

              <p>
                PokéLandia es un proyecto educativo
                desarrollado con React y la PokéAPI para
                practicar consumo de APIs, componentes
                reutilizables y diseño responsive.
              </p>
            </div>

            <div>
              <h3>
                Tecnologías
              </h3>

              <ul className="contact__list">
                <li>React</li>
                <li>React Router</li>
                <li>Vite</li>
                <li>PokéAPI</li>
                <li>CSS moderno</li>
              </ul>
            </div>

            <div>
              <h3>
                Enlaces
              </h3>

              <div className="contact__socials">
                <a
                  href="https://github.com/hazajulian"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub aria-hidden="true" />
                </a>

                <a
                  href="https://www.linkedin.com/in/julian-haza-3723ba317/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin aria-hidden="true" />
                </a>

                <a
                  href="https://discord.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord"
                >
                  <FaDiscord aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Toast
        open={toast.open}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={handleCloseToast}
      />
    </main>
  );
}