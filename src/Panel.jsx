import React, { useState, useRef } from 'react';
import './Panel.css';
import background from './assets/bhp.png';
import { Modal } from 'react-bootstrap';

function Panel(props) {
  const { areas, user } = props;
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const fileInputRef = useRef(null);
  const [modalShow, setModalShow] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false); // Estado para manejar el mensaje de "Enviando.."
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setModalShow(false);
    setTimeout(() => {
      props.changeScreen('Login'); // Cambia de pantalla después de un breve retraso para mostrar el mensaje
    }, 1000); // Retraso de 1 segundo
  };

  const Reset = () => {
    setModalShow(false);
    setTimeout(() => {
      props.changeScreen('Panel'); // Cambia de pantalla después de un breve retraso para mostrar el mensaje
    }, 1000); // Retraso de 1 segundo
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(selectedFile);
      convertToBase64(selectedFile);
    } else {
      alert('Solo se permiten archivos Excel.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/vnd.ms-excel' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(droppedFile);
      convertToBase64(droppedFile);
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
      return;
    }
    // Aquí puedes añadir cualquier lógica adicional que necesites para manejar el archivo cargado
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64String(reader.result);
    };
    reader.onerror = (error) => {
      console.error('Error al convertir archivo a base64:', error);
    };
  };

  const EnviarExcel = () => {
    setLoggingIn(true); // Muestra mensaje de "Enviando..."
    setLoading(true);
    const bodyContent = JSON.stringify({
      method: 'post',
      controller: 'SendFile',
      data: `{area: '${selectedArea}', userName:'${user}', excel: '${base64String}'}`
      ,
    });

    console.log('Body content to send:', bodyContent);

    fetch('https://prod2-24.brazilsouth.logic.azure.com:443/workflows/dee3e41beb7242f58928d11c65d2470b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SPKH1WvfZzx6B9SrlwkXPXrbmbNGNJjJbFsEHbWvjLo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyContent,
    })
    .then(response => response.json())
    .then(data => {
      setModalShow(true);
      setLoggingIn(false); 
    setLoading(false);

    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <>
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
              <select 
                id="area-select" 
                className="select"
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="">Seleccione un área</option>
                {areas.map((area, index) => (
                  <option key={index} value={area}>{area}</option>
                ))}
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

                <div className="button-container2">
                  <button type="submit" className="submit-button" disabled={loading} onClick={EnviarExcel}>
                    {loading ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
          </div>
        </div>
        
      </div>

      <Modal 
        show={false/* modalShow */} 
        onHide={handleClose} 
        >
        <Modal.Header closeButton>
          <Modal.Title>Reenvio De Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Quieres Enviar Otro Archivo?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="file-button" onClick={Reset}>
            Si
          </button>
          <button className="file-button" onClick={handleClose}>
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Panel;