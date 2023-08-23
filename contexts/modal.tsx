import {
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { Card } from "@/components/ui/card";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, closeModal, children }: ModalProps) {
  return (
    isOpen && (
      <div
        className="fixed w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-black/[0.6] z-10"
        onClick={closeModal}
      >
        <Card
          className="p-4 max-w-full flex flex-col justify-start items-left min-w-sm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </Card>
      </div>
    )
  );
}

interface ModalContextType {
  setModal: (modalInfo: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  setModal: (modalInfo: ReactNode) => modalInfo,
  closeModal: () => null,
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const setModal = useCallback(
    (content: ReactNode) => {
      setContent(content);
      setIsOpen(true);
    },
    [setContent, setIsOpen]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setContent(null);
  }, [setIsOpen]);

  const modalValues = useMemo(
    () => ({
      setModal,
      closeModal,
    }),
    [setModal, closeModal]
  );

  return (
    <ModalContext.Provider value={modalValues}>
      {children}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        {content}
      </Modal>
    </ModalContext.Provider>
  );
}
const useModal = () => useContext(ModalContext) as ModalContextType;

export default useModal;
