import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

function ConfirmarPresenca() {
  const [nome, setNome] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState(''); // Para armazenar mensagens de erro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpar qualquer erro anterior

    try {
      const response = await fetch('http://localhost:3001/confirmar-presenca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
      });

      if (response.ok) {
        setConfirmado(true); // Indicar que a presença foi confirmada
      } else if (response.status === 400) {
        // Tentamos extrair o erro do JSON retornado
        const errorData = await response.json();
        setError(errorData.message || 'Ocorreu um erro ao confirmar a presença.');
      } else {
        setError('Erro inesperado. Tente novamente mais tarde.');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  const handleOutroNome = () => {
    setNome('');
    setConfirmado(false);
    setError(''); // Limpar o erro
  };

  return (
    <div className="confirmar-presenca-container">
      {/* Moldura ao redor do conteúdo principal */}
      <div className="frame">
        {/* Botão para voltar */}
        <Link to="/" className="back-button">
          <Icon path={mdiArrowLeft} size={1} />
          Voltar
        </Link>

        <h2>Confirmar Presença</h2>

        {/* Se a presença foi confirmada, mostrar opções */}
        {confirmado ? (
          <div>
            <p>{nome} foi confirmado com sucesso!</p>
            <button onClick={handleOutroNome}>Confirmar outro nome</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Nome: 
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </label>
            <button type="submit">Confirmar Presença</button>
          </form>
        )}

        {/* Exibir a mensagem de erro, se houver */}
        {error && <div className="error-notify">{error}</div>}
      </div>
    </div>
  );
}

export default ConfirmarPresenca;
