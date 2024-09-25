import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

function ListaPresentes() {
    const [itens, setItens] = useState([]);
    const [modalItem, setModalItem] = useState(null); // Item atualmente selecionado no modal
    const [valorDoacao, setValorDoacao] = useState(0);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [pagamentoConfirmado, setPagamentoConfirmado] = useState(false);
    const [copied, setCopied] = useState(false); // Para notificação de código copiado

    useEffect(() => {
        async function fetchItens() {
            const response = await fetch('http://localhost:3001/itens');
            const data = await response.json();
            setItens(data);
        }
        fetchItens();
    }, []);

    const handlePresentear = (item) => {
        setModalItem(item);
        setQrCodeUrl(''); // Limpa o QRCode ao abrir o modal
        setPagamentoConfirmado(false);
    };

    const handleGerarQRCode = () => {
        setQrCodeUrl('/images/qrcode.jpg'); // Exemplo de QRCode gerado (colocar imagem em /public/images)

        // Esperar 10 segundos antes de mostrar o botão de confirmar pagamento
        setTimeout(() => {
            setPagamentoConfirmado(true);
        }, 10000);
    };

    const handleConfirmarPagamento = async () => {
        const response = await fetch('http://localhost:3001/confirmar-pagamento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ valor: valorDoacao })
        });

        const data = await response.json();
        if (data.sucesso) {
            // Atualiza os itens com o novo progresso
            setItens(data.itensAtualizados);
        }
        setModalItem(null); // Fecha o modal após confirmar o pagamento
    };

    const handleCopyPix = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(true); // Mostra a notificação de cópia
        setTimeout(() => setCopied(false), 2000); // Remove a notificação após 2 segundos
    };

    const closeModal = () => {
        setModalItem(null);
    };

    return (
        <div className="lista-presentes-container">
            <Link to="/" className="back-button">
                <Icon path={mdiArrowLeft} size={1.5} />
                Voltar
            </Link>

            <h2>Lista de Casamento</h2>
            <p>
                Todo valor será destinado para nossa "casinha". <br />
                Fizemos algumas brincadeiras nos itens para tornar tudo mais divertido. <br />
                Sinta-se à vontade para contribuir com o que puder e quantas vezes quiser :)
            </p>


            {/* Botão de Presentear no topo */}
            <button className="presentear-btn" onClick={() => handlePresentear(itens[0])}>
                Presentear Agora
            </button>

            <div className="lista-presentes">
                {itens.map((item) => (
                    <div key={item.id} className={`item ${item.progresso === 100 ? 'item-completo' : ''}`}>
                        <img src={item.imagem} alt={item.nome} />
                        <h3>{item.nome}</h3>
                        <p>R${item.valor}</p>
                        <div className="progresso">
                            <div
                                className="barra-progresso"
                                style={{ width: `${item.progresso}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {modalItem && (
                <>
                    <div className="modal-overlay" onClick={closeModal}></div>
                    <div className="modal">
                        <h3>Presentear noivos</h3>
                        <label>
                            Valor do Presentre (mínimo R$50):
                            <input
                                type="number"
                                min="50"
                                value={valorDoacao}
                                onChange={(e) => setValorDoacao(Number(e.target.value))}
                            />
                        </label>
                        <button
                            onClick={handleGerarQRCode}
                            disabled={valorDoacao < 50} // Botão desativado se o valor for menor que 30
                        >
                            Gerar QRCode PIX
                        </button>

                        {qrCodeUrl && (
                            <>
                                <p>
                                    Para fazer o pagamento via PIX, utilize o QRCode abaixo ou o código informado:
                                </p>
                                <div className="qrcode fade-in">
                                    <img src={qrCodeUrl} alt="QRCode" />
                                </div>
                                <p
                                    className="pix-code"
                                    onClick={() => handleCopyPix('00020126660014br.gov.bcb.pix0114+55499885685460226Casamento Maria e Eduardo 5204000053039865802BR5925Eduardo Henrique de Souza6008Brasilia62090505wr85063042718')}
                                    style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                    Código PIX: 00020126660014br.gov.bcb.pix0114+55499885685460226Casamento Maria e Eduardo 5204000053039865802BR5925Eduardo Henrique de Souza6008Brasilia62090505wr85063042718
                                </p>
                                <small>(Clique no código para copiá-lo)</small>
                                {copied && <div className="copied-notification">Código PIX copiado!</div>}
                            </>
                        )}

                        {pagamentoConfirmado && (
                            <button onClick={handleConfirmarPagamento}>Confirmar Pagamento</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default ListaPresentes;
