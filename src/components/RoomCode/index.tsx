import toast, { Toaster } from "react-hot-toast";

import copyImg from "../../assets/images/copy.svg";

import "./style.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success("código copiado!");
  }

  return (
    <>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
      <Toaster
        toastOptions={{
          style: {
            background: "#9472fb",
            color: "#fff",
          },
          success: {
            duration: 1000,
          },
        }}
      />
    </>
  );
}
