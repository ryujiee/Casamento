import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiMapMarker } from '@mdi/js';

function DataLocalizacao() {
  return (
    <div className="data-localizacao-container">
      <div className="frame">
        {/* Botão para voltar */}
        <Link to="/" className="back-button">
          <Icon path={mdiArrowLeft} size={1.5} />
          Voltar
        </Link>

        <h2>Data e Localização</h2>

        {/* Data e Horário do casamento */}
        <p><strong>Data:</strong> 14/12/2024 <br />
        <strong>Horário de início:</strong> 17:00</p>

        {/* Google Maps iframe */}
        <div className="google-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3530.854541853354!2d-52.6538424!3d-27.1150717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e4b45df81dfe83%3A0xaf520fbeb308d673!2sSede%20do%20%C3%81lvaro!5e0!3m2!1spt-BR!2sbr!4v1695474540342!5m2!1spt-BR!2sbr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do Casamento"
          ></iframe>
        </div>

        <p>
          <strong>Local:</strong> 
          <a 
            href="https://www.google.com/maps/place/Sede+do+%C3%81lvaro/@-27.1150717,-52.6538424,15z/data=!4m6!3m5!1s0x94e4b45df81dfe83:0xaf520fbeb308d673!8m2!3d-27.1150717!4d-52.6538424!16s%2Fg%2F11bwf89qjb?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="google-maps-link"
          >
            <Icon path={mdiMapMarker} size={1} /> Ver no Google Maps
          </a>
        </p>
      </div>
    </div>
  );
}

export default DataLocalizacao;
