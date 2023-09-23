import { Button } from "@/components/ui/button";
import useModal from "@/contexts/modal";
import { ClaimModalContent } from "./claim-modal-content";

export default function ClaimSection() {
  const { pushModal } = useModal();

  return (
    <>
      <Button
        className="mb-3 mx-4"
        onClick={() => {
          pushModal(<ClaimModalContent />);
        }}
      >
        Claim Note
      </Button>
      <p className="text-sm leading-loose my-4 px-4">
        Use your Note to deposit collateral, acquire XP, mint DYAD, and earn
        with our partners.
        <br />
        The longer you keep your collateral deposited, the more it will grow
        with time enabling you to mint dyad at a more efficient rate.
      </p>
    </>
  );
}
