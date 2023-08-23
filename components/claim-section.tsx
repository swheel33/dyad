import { Button } from "@/components/ui/button";
import useModal from "@/contexts/modal";
import { ClaimModalContent } from "./claim-modal-content";

export default function ClaimSection() {
  const { setModal } = useModal();

  return (
    <>
      <Button
        className="mb-3 mx-4"
        onClick={() => {
          setModal(<ClaimModalContent />);
        }}
      >
        Claim dNFT
      </Button>
      <p className="text-sm leading-loose my-4 px-4">
        dNFTs are ERC 721 NFTs with a unique and maximally composable metadata
        structure.
      </p>

      <p className="text-sm leading-loose my-4 px-4">
        Read our{" "}
        <a
          href="https://dyadstable.notion.site/DYAD-full-52096aed265247e7a50b14f06c228a7e?pvs=4"
          className="underline"
        >
          DOCS
        </a>{" "}
        to learn how dNFTs are your key to participate in the DYAD ecosystem.
      </p>
    </>
  );
}
