import React from 'react';

/**
 * Componente de renderizado condicional para mostrar alertas de error o confirmación.
 * Solo se renderiza en el DOM cuando el prop `mensaje` tiene contenido.
 */
export default function AlertaMensaje({ mensaje, tipo = 'danger', onClose = null }) {
  if (!mensaje) {
    return null;
  }

  return (
    <div
      role="alert"
      data-testid="alerta-mensaje"
      className={`alert alert-${tipo} d-flex align-items-center justify-content-between my-2`}
    >
      <div>
        <i
          className={`bi ${
            tipo === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-check-circle-fill'
          } me-2`}
        />
        <span>{mensaje}</span>
      </div>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          aria-label="Cerrar alerta"
          onClick={onClose}
        />
      )}
    </div>
  );
}
