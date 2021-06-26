import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import illustrationIMG from "../../assets/images/illustration.svg";
import logoIMG from "../../assets/images/logo.svg";
import googleIconIMG from "../../assets/images/google-icon.svg";

import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import "../styles/auth.scss";

export function Home() {
  const [roomCode, setRoomCode] = useState("");

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      toast.error("Informe o nome da sala.");
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Sala inexistente.");
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error("Sala fechada.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <Toaster
          toastOptions={{
            icon: "\u26A0\uFE0F",
            position: "top-right",
            style: {
              background: "#8585fd",
              color: "#fff",
            },
            error: {
              duration: 2500,
            },
          }}
        />
        <img
          src={illustrationIMG}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <div>
          <strong>Crie salas de Q&amp;A ao-vivo</strong>
          <p>tire as dúvidas de sua audiência em tempo real</p>
        </div>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoIMG} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconIMG} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
