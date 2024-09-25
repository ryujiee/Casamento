import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

function Convite() {
    return (
        <div className="convite-container">
            {/* Logo do Casamento */}
            <img src="/images/logo.png" alt="Logo do Casamento" className="logo" />

            {/* Texto do Convite */}
            <div className="convite-texto">
                <h1>Bem-vindo ao nosso casamento!</h1>
                <p>
                    É com muita alegria que anunciamos que vamos nos casar! Este momento é muito especial para nós,
                    e gostaríamos muito de compartilhar essa felicidade com você. <br />

                    Sua presença significa muito para nós, pois você é uma pessoa importante em nossa jornada.
                    Juntos, vamos celebrar o amor, a união e a felicidade em um dia que será inesquecível. <br />

                    Estamos preparando uma cerimônia cheia de amor e alegria, e será uma grande honra ter você ao nosso lado
                    para viver essa história conosco. <br />

                    Venha comemorar com a gente esse momento único, pois sua presença tornará tudo ainda mais especial! <br />

                    Nos encontramos no grande dia! Até lá, muita expectativa, carinho e amor! <br />
                </p>
                <p>
                    Com todo carinho,<br />
                    Eduardo & Maria
                </p>
            </div>
            <Link to="/" className="back-button">
                <Icon path={mdiArrowLeft} size={1.5} />
                Voltar
            </Link>
        </div>
    );
}

export default Convite;
