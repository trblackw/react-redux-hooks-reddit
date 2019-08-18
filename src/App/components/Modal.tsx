import React, { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const XIcon: React.FC = (): JSX.Element => (
   <svg
      color='#ff0000'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      width='16'
      height='16'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      style={{ display: 'inline-block', verticalAlign: 'middle', overflow: 'visible' }}>
      <path d='M1.0606601717798212 1.0606601717798212 L14.939339828220179 14.939339828220179' />
      <path d='M14.939339828220179 1.0606601717798212 L1.0606601717798212 14.939339828220179' />
   </svg>
);
const Portal: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
   const modalRoot: HTMLElement | null = document.getElementById('modal');
   const el: HTMLDivElement = document.createElement('div');

   useEffect(() => {
      modalRoot && modalRoot.appendChild(el);
   }, []);

   //@ts-ignore
   useEffect(() => {
      return () => modalRoot && modalRoot.removeChild(el);
   });

   return createPortal(children, el);
};

const Modal: React.FC<{ children: ReactNode; toggle: () => void; open: boolean }> = ({ children, toggle, open }) => (
   <Portal>
      {open && (
         <ModalWrapper>
            <ModalCard>
               <CloseButton onClick={toggle}>
                  <XIcon />
               </CloseButton>
               {children}
            </ModalCard>
            <Background onClick={toggle} />
         </ModalWrapper>
      )}
   </Portal>
);

export default Modal;

const ModalWrapper = styled.div`
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ModalCard = styled.div`
   position: relative;
   min-width: 320px;
   max-width: 600px;
   width: 60%;
   z-index: 10;
   margin-bottom: 100px;
   background: white;
   border-radius: 5px;
   padding: 15px;
   box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
   position: absolute;
   top: 0;
   right: 0;
   border: none;
   background: transparent;
   padding: 10px;
   &:hover {
      cursor: pointer;
   }
`;

const Background = styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   background: black;
   opacity: 0.1;
`;
