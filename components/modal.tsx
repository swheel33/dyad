import { Card } from "@/components/ui/card";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

export function Modal({ showModal, closeModal, children }: Props) {
  return (
    showModal && (
      <div
        className="fixed w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-black/[0.6] z-10"
        onClick={closeModal}
      >
        <Card
          className="p-4 w-80 max-w-screen-sm flex flex-col justify-start items-left min-w-sm"
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
