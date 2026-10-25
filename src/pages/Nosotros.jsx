import React from 'react';

export default function Nosotros() {
  return (
    <div className="container py-4 fade-in">
      <div className="card border-0 shadow-sm p-4 p-md-5 mb-4">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-7">
            <span className="sp-category-badge mb-2">NUESTRA HISTORIA EN MAIPÚ</span>
            <h2 className="fw-bold mb-3">
              SaludPlus: Farmacia Comunitaria al Servicio de Tu Familia
            </h2>
            <p className="text-muted">
              Fundada hace más de 8 años en la comuna de Maipú, Región Metropolitana,
              <strong> Farmacia SaludPlus</strong> nació con el propósito de acercar
              medicamentos bioequivalentes y orientación farmacéutica profesional a precios
              justos para nuestra comunidad.
            </p>
            <p className="text-muted mb-0">
              Hoy atendemos a más de 200 vecinos diariamente y gestionamos más de 1.500
              pedidos mensuales a través de nuestra plataforma digital en React,
              integrando control de stock en tiempo real y despacho rápido en toda la RM.
            </p>
          </div>

          <div className="col-12 col-lg-5">
            <div className="row g-3 text-center">
              <div className="col-6">
                <div className="p-3 bg-light rounded-3 border">
                  <h3 className="fw-bold text-success mb-0">+8 Años</h3>
                  <small className="text-muted">Trayectoria en Maipú</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-light rounded-3 border">
                  <h3 className="fw-bold text-success mb-0">200+</h3>
                  <small className="text-muted">Pacientes Diarios</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-light rounded-3 border">
                  <h3 className="fw-bold text-success mb-0">3 Q.F.</h3>
                  <small className="text-muted">Químicos Farmacéuticos</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-light rounded-3 border">
                  <h3 className="fw-bold text-success mb-0">100%</h3>
                  <small className="text-muted">Trazabilidad SEREMI</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
