import React, { useState, useRef } from 'react';
import background from './assets/bhp.png';
import './Panel.css';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap CSS

function Panel(props) {
  const { areas, user, UID } = props;
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const fileInputRef = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false); // Estado para manejar el mensaje de "Enviando.."
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(''); // Estado para manejar el mensaje de advertencia

  const handleClose = () => {
    setModalShow(false);
    alert('Cerrando Sesion.');
    setTimeout(() => {
      props.changeScreen('Login'); // Cambia de pantalla después de un breve retraso para mostrar el mensaje
    }, 1500); // Retraso de 1.5 segundos
  };

  const Reset = () => {
    setSelectedArea('');
    setFile(null);
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
      setWarning(''); // Limpiar el mensaje de advertencia cuando se selecciona un archivo válido
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
      setWarning(''); // Limpiar el mensaje de advertencia cuando se agrega un archivo válido por arrastrar y soltar
    } else {
      alert('Solo se permiten archivos Excel.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (loading) return; // Evitar acción si está cargando
    fileInputRef.current.click();
  };

  const handleFileButtonClick = () => {
    if (loading || !file) { // Evitar acción si está cargando
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
    if (loading) return; // Evitar acción si está cargando
    if (!selectedArea || !file) {
      setWarning('Por favor, seleccione un área y cargue un archivo Excel.');
      return;
    }

    if (!UID) {
      setWarning('El UID es requerido para enviar el archivo.');
      return;
    }

    setWarning(''); // Limpiar el mensaje de advertencia cuando se envía el archivo correctamente
    setLoggingIn(true); // Muestra mensaje de "Enviando..."
    setLoading(true);
    const bodyContent = JSON.stringify({
      method: 'post',
      controller: 'SendFile',
      data: `{area: '${selectedArea}', excel: '${base64String}', UID: '${UID}'}`
      ,
    });


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
      setLoggingIn(false); 
      setLoading(false);
    });
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
            <select 
              id="area-select" 
              className="select"
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(e.target.value);
                if (e.target.value) setWarning(''); // Limpiar el mensaje de advertencia cuando se selecciona un área
              }}
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
              <button 
                className="file-button" 
                onClick={handleFileButtonClick}
                disabled={loading} // Deshabilitar el botón si está cargando
              >
                <i className="icon-attach"></i>
                Cargar Archivo
              </button>
            </div>
          </div>
          <a href="/plantilla(1).xlsx" className="download-link" download>
            Para descargar la plantilla con el formato correcto haga clic en este enlace
          </a>
          {warning && <div className="warning-message">{warning}</div>}
          <div className="button-container2">
            <button 
              type="submit" 
              className="submit-button" 
              disabled={loading} 
              onClick={EnviarExcel}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </div>
      </div>
      <Modal show={modalShow} centered backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Reenvio De Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Quieres Enviar Otro Archivo?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="submit-button" onClick={Reset}>
            Si
          </button>
          <button className="file-button2" onClick={handleClose}>
            No
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Panel;