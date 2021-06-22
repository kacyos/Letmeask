import { Link } from 'react-router-dom';
import illustrationIMG from '../assets/images/illustration.svg';
import logoIMG from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationIMG} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoIMG} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form action="">
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Deseja entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>

    </div>
  )
};