'use client';

import { MdOutlineClose } from "react-icons/md";
import ProfileForm from "./ProfileForm";
import { DUser } from "@/types/user/user";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: DUser;
  type: 'email' | 'password';
  title: string;
  description: string;
}

export default function EditModal({ 
  isOpen, 
  onClose, 
  user, 
  type, 
  title, 
  description 
}: EditModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white px-4 py-6 rounded-lg shadow-xl w-full max-w-md mx-auto relative">
        <button
          onClick={onClose}
          className="w-8 h-8 absolute top-3 right-3 bg-stone-400 hover:bg-stone-600 cursor-pointer rounded-full flex items-center justify-center"
          aria-label="Close modal"
        >
          <MdOutlineClose className="w-4 h-4 text-white" />
        </button>
        <h2 className="font-sub-title1 mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
        <ProfileForm user={user} type={type} onSuccess={onClose} />
      </div>
    </div>
  );
}
