// import { useState } from 'react';
import type { ReactNode } from 'react';
import { styled } from 'styled-components';
import { X } from 'lucide-react';

import useModal from '../hooks/useModal';

interface ModalProps {
  children?: ReactNode;
}

const Container = styled.div`
  position: relative;
  background-color: #aaa;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 4px;
  font-size: 16px;
  color: black;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <Container>
      <CloseButton onClick={closeModal}>
        <X size={24} strokeWidth={2.25} color="#666" />
      </CloseButton>
      {children}
    </Container>
  );
};

export default Modal;
