import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCalendar, mdiRing, mdiGift, mdiAccountCheck, mdiEmailOpenHeartOutline } from '@mdi/js';

function Home() {
  const [diasRestantes, setDiasRestantes] = useState(0);

  // Função para calcular os dias restantes
  useEffect(() => {
    const calcularDiasRestantes = () => {
      const dataCasamento = new Date('2024-12-14'); // Data do casamento
      const dataAtual = new Date();
      const diferenca = dataCasamento - dataAtual;
      const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24)); // Converter milissegundos para dias
      setDiasRestantes(dias);
    };

    calcularDiasRestantes();
  }, []);

  return (
    <div className="home-container">
      {/* Moldura ao redor do conteúdo principal */}
      <div className="frame">
        {/* Logo no topo */}
        <img src="/images/logo.png" alt="Logo do Casamento" className="logo" />

        {/* Nome dos noivos em fonte elegante */}
        <h1 className="nome-casal">♡ Eduardo & Maria ♡</h1>
        <h1 className="data">-- 14.12.2024 --</h1>

        {/* Exibir os dias restantes até o casamento */}
        <p className="dias-restantes">
          Faltam {diasRestantes} dias
        </p>

        {/* Navegação com ícones */}
        <div className="nav-home">
          <Link to="/convite">
            <Icon path={mdiEmailOpenHeartOutline} size={1.5} />
            Convite
          </Link>
          <Link to="/confirmar-presenca">
            <Icon path={mdiAccountCheck} size={1.5} />
            Confirmar Presença
          </Link>
          <Link to="/data-localizacao">
            <Icon path={mdiRing} size={1.5} />
            Localização da Cerimônia
          </Link>
          <Link to="/cronograma">
            <Icon path={mdiCalendar} size={1.5} />
            Cronograma
          </Link>
          <Link to="/lista-presentes">
            <Icon path={mdiGift} size={1.5} />
            Lista de Presentes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
