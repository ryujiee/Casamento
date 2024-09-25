import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

function Cronograma() {
  const [cronograma, setCronograma] = useState([]);

  useEffect(() => {
    // Fazer a requisição ao backend para buscar o cronograma
    async function fetchCronograma() {
      try {
        const response = await fetch('http://localhost:3001/cronograma');
        const data = await response.json();
        setCronograma(data);
      } catch (error) {
        console.error('Erro ao buscar o cronograma:', error);
      }
    }

    fetchCronograma();
  }, []);

  return (
    <div className="cronograma-container">
      <div className="frame">
        {/* Botão para voltar */}
        <Link to="/" className="back-button">
          <Icon path={mdiArrowLeft} size={1.5} />
          Voltar
        </Link>

        <h2>Cronograma do Casamento</h2>

        {/* Tabela de Cronograma */}
        <table>
          <thead>
            <tr>
              <th>Hora de início</th>
              <th>Evento</th>
            </tr>
          </thead>
          <tbody>
            {cronograma.length > 0 ? (
              cronograma.map((item, index) => (
                <tr key={index}>
                  <td>{item.hora}</td>
                  <td>{item.evento}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Carregando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cronograma;
