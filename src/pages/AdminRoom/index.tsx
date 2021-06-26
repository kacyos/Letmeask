import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";

import { /*toast*/ Toaster } from "react-hot-toast";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";
import like from "../../assets/images/like.svg";

import { InfoModal } from "../../components/Modal";
import { Question } from "../../components/Question";
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [questionIdDeleted, setQuestionIdDeleted] = useState("");
  //const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    setIsOpen(false);
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <Toaster
        toastOptions={{
          error: {
            duration: 2000,
          },
          success: {
            duration: 2000,
          },
        }}
      />

      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.length > 0 ? (
            questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <div className="likes">
                        <p>{question.likeCount}</p>
                        <img src={like} alt="Marcar pergunta como respondida" />
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <img
                          src={checkImg}
                          alt="Marcar pergunta como respondida"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Dar destaque a pergunta" />
                      </button>
                    </>
                  )}
                  <button type="button" onClick={() => setIsOpen(true)}>
                    <img
                      src={deleteImg}
                      alt="Remover pergunta"
                      onClick={() => setQuestionIdDeleted(question.id)}
                    />
                  </button>
                </Question>
              );
            })
          ) : (
            <span>Não há perguntas a serem exibidas.</span>
          )}
        </div>
      </main>
      <InfoModal isOpen={modalIsOpen}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 5.99988H5H21"
            stroke="#e73f5d"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z"
            stroke="#e73f5d"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <strong>Excluir pegunta</strong>
        <span>Tem certeza que você deseja excluir esta pergunta?</span>
        <div className="button-modal">
          <button className="btn-cancel" onClick={() => setIsOpen(false)}>
            Cancelar
          </button>
          <button
            className="btn-delete"
            onClick={() => handleDeleteQuestion(questionIdDeleted)}
          >
            Sim, excluir
          </button>
        </div>
      </InfoModal>
    </div>
  );
}
