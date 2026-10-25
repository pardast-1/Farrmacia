import React from 'react';

/**
 * Componente reutilizable de botón siguiendo el principio Single Responsibility.
 * Recibe props explícitas: label, onClick, variant, disabled, type, icon.
 */
export default function BotonAccion({
  label,
  onClick,
  variant = 'success',
  type = 'button',
  disabled = false,
  className = '',
  icon = null
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`.trim()}
    >
      {icon && <i className={`bi ${icon} me-1`} />}
      <span>{label}</span>
    </button>
  );
}
