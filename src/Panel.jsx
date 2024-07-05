import React, { useState, useRef } from 'react';
import './Panel.css';

function Panel() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/vnd.ms-excel' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(droppedFile);
    } else {
      alert('Solo se permiten archivos Excel.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="panel">
      <div className="header">
        <i className="icon-lock"></i>
        <span>Cargar Archivo</span>
      </div>
      <div className="content">
        <h2>Cargar Archivo de Pre-Validación de HH</h2>
        <div className="form-group">
          <label htmlFor="area-select">Selecciona el Área</label>
          <select id="area-select" className="select">
            <option>Catodos</option>
            <option>Otro</option>
          </select>
        </div>
        <div 
          className="form-group file-upload" 
          onDrop={handleDrop} 
          onDragOver={handleDragOver}
        >
          <label>Cargue un Archivo excel con el formato correcto *</label>
          <div className="file-upload-content" onClick={handleClick}>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
              accept=".xls,.xlsx"
            />
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Sin Archivos.</p>
            )}
            <button className="file-button">
              <i className="icon-attach"></i>
              Cargar Archivo
            </button>
          </div>
        </div>
        <a href="#" className="download-link">
          Para descargar la plantilla con el formato correcto haga clic en este enlace
        </a>
        <button className="submit-button">Cargar</button>
      </div>
    </div>
  );
}

export default Panel;