import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Link, useHistory } from "react-router-dom";
import illustrationIMG from "../../assets/images/illustration.svg";
import logoIMG from "../../assets/images/logo.svg";
import { database } from "../../services/firebase";

import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/useAuth";

import "../styles/auth.scss";

export function NewRoom() {
  const [newRoom, setNewRoom] = useState("");

  const { user } = useAuth();
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      toast.error("Informe o nome da sala.");
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
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
      <aside>
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Deseja entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
