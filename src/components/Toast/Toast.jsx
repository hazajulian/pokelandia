// Toast.jsx
// Muestra mensajes temporales de confirmación, información o error.

import { useEffect } from "react";

import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

import "./Toast.css";

const TOAST_ICONS = {
  success: FaCheckCircle,
  error: FaExclamationCircle,
  info: FaInfoCircle,
};

export function Toast({
  open,
  type = "info",
  title = "",
  message = "",
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    if (!open || !onClose) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    open,
    duration,
    onClose,
  ]);

  if (!open) {
    return null;
  }

  const Icon =
    TOAST_ICONS[type] ||
    TOAST_ICONS.info;

  const toastClassName = [
    "toast",
    `toast--${type}`,
  ].join(" ");

  return (
    <div
      className="toastContainer"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={toastClassName}
        role={
          type === "error"
            ? "alert"
            : "status"
        }
      >
        <div className="toast__icon">
          <Icon aria-hidden="true" />
        </div>

        <div className="toast__content">
          {title && (
            <strong className="toast__title">
              {title}
            </strong>
          )}

          {message && (
            <p className="toast__message">
              {message}
            </p>
          )}
        </div>

        <button
          type="button"
          className="toast__close"
          aria-label="Cerrar mensaje"
          title="Cerrar"
          onClick={onClose}
        >
          <FaTimes aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}