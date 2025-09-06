"use client";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

interface ModalProps {  
  isOpen: boolean;
  isClosedButton: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, isClosedButton, onClose, title, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-45 p-4">
      <div className="bg-white px-4 py-6 rounded-lg shadow-xl w-full max-w-md mx-auto relative">
        {isClosedButton && (
          <button
            onClick={onClose}
            className="w-8 h-8 absolute top-3 right-3 bg-stone-400 hover:bg-stone-600 cursor-pointer rounded-full flex items-center justify-center"
            aria-label="Close modal"
          >
            <MdOutlineClose className="w-4 h-4 text-white" />
          </button>
        )}
        {title && (
          <h2 className="font-sub-title1 mb-2">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}