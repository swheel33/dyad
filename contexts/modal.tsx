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
  shiftModal: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, shiftModal, children }: ModalProps) {
  return (
    isOpen && (
      <div
        className="fixed w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-black/[0.6] z-10"
        onClick={shiftModal}
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
  pushModal: (modalInfo: ReactNode) => void;
  shiftModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  pushModal: (modalInfo: ReactNode) => modalInfo,
  shiftModal: () => null,
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ReactNode[]>([]);

  const pushModal = useCallback(
    (newContent: ReactNode) => {
      setContent((c) => [newContent, ...c]);
    },
    [setContent]
  );

  const shiftModal = useCallback(() => {
    setContent((c) => c.slice(1));
  }, []);

  const modalValues = useMemo(
    () => ({
      pushModal,
      shiftModal,
    }),
    [pushModal, shiftModal]
  );

  return (
    <ModalContext.Provider value={modalValues}>
      {children}
      <Modal isOpen={content.length > 0} shiftModal={shiftModal}>
        {content[0]}
      </Modal>
    </ModalContext.Provider>
  );
}
const useModal = () => useContext(ModalContext) as ModalContextType;

export default useModal;
