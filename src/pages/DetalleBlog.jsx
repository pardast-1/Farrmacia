import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export default function DetalleBlog() {
  const { id } = useParams();
  const { blogs } = useStore();
  const blog = blogs.find((b) => b.id === id) || blogs[0];

  return (
    <div className="container py-4 fade-in">
      <Link to="/blog" className="btn btn-outline-secondary btn-sm mb-3">
        <i className="bi bi-arrow-left me-1" />
        Volver al Blog
      </Link>

      <article className="card border-0 shadow-sm p-4 p-md-5">
        <span className="sp-category-badge mb-2" style={{ width: 'fit-content' }}>
          {blog.categoria}
        </span>
        <h1 className="fw-bold mb-2">{blog.titulo}</h1>
        <p className="text-muted small mb-4">
          Publicado el {blog.fecha} por <strong>{blog.autor}</strong>
        </p>

        <img
          src={blog.imagen}
          alt={blog.titulo}
          className="img-fluid rounded-4 mb-4"
          style={{ maxHeight: '380px', objectFit: 'cover', width: '100%' }}
        />

        {blog.contenido.map((parrafo, idx) => (
          <p key={idx} className="fs-6 lh-lg text-secondary mb-3">
            {parrafo}
          </p>
        ))}
      </article>
    </div>
  );
}
