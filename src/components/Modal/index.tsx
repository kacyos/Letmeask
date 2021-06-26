import { ReactPropTypes } from "react";
import { PropsWithRef } from "react";
import { PropsWithChildren } from "react";
import { PropsWithoutRef, ReactNode } from "react";
import ReactModal from "react-modal";
import { JsxAttribute, JsxAttributeLike } from "typescript";
import "./style.scss";

export function InfoModal({ ...props }) {
  return (
    <ReactModal
      className="modal"
      closeTimeoutMS={200}
      overlayClassName="overlay"
      isOpen={props.isOpen}
    >
      {props.children}
    </ReactModal>
  );
}
