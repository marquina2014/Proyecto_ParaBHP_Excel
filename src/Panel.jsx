import React, { useState, useRef } from 'react';
import './Panel.css';
import background from './assets/bhp.png'

function Panel(props) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(selectedFile);
    } else {
      alert('Solo se permiten archivos Excel.');
    }
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

  const handleFileButtonClick = () => {
    if (!file) {
      alert('Por favor, cargue un archivo Excel antes de continuar.');
      return;
    }
    // Aquí puedes añadir cualquier lógica adicional que necesites para manejar el archivo cargado
  };

  const handleLoginClick = () => {
    props.changeScreen('Login')
  };

  return (
    <div className="panel"
      style={{
        backgroundImage: `URL(${background})`
      }}
    >
      <div className="header">
        <i className="icon-lock"></i>
        <span>Cargar Archivo</span>
      </div>
      <div className="content">
        <div className='Caja'>
        <h2>Cargar Archivo de Pre-Validación de HH</h2>
        <div className="form-group">
          <label htmlFor="area-select">Selecciona el Área</label>
          <select id="area-select" className="select">
            <option>Opcion 1</option>
            <option>Opcion 2</option>
            <option>Opcion 3</option>
            <option>Opcion 4</option>
            <option>Opcion 5</option>
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
            <button className="file-button" onClick={handleFileButtonClick}>
              <i className="icon-attach"></i>
              Cargar Archivo
            </button>
          </div>
        </div>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" className="download-link" target="_blank" rel="noopener noreferrer">
          Para descargar la plantilla con el formato correcto haga clic en este enlace
        </a>
        <button className="submit-button" onClick={handleLoginClick}>Enviar</button>
          </div>
      </div>
    </div>
  );
}

export default Panel;