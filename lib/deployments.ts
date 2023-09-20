interface Deployment {
  dnft: string;
  vaultManagerSLL: string;
  vaultSLL: string;
  dyad: string;
  vaultManager: string;
  staking: string;
  vault: string;
}

export const deployments: { [id: string]: Deployment } = {
  // "1": {
  //   dnft: "0xdc400bbe0b8b79c07a962ea99a642f5819e3b712",
  // },
  "5": {
    dnft: "0x7B9B6CAAd6eE04E9173b49f33aB8a01E096cF258",
    vaultManagerSLL: "0x0686d75307040EE0C86790D0a62b6c95e3E857C9",
    vaultSLL: "0x25B716D9dCc09842413161abF0F3ff336d165a87",
    dyad: "0xf47D4F3F3Cd98d34e559eFe71B5aCcAb97E4560D",
    vaultManager: "0x1C0c439abd9958b55eBF7Fa8030b5fc725ca21cb",
    staking: "0x9D5Fd41ee4A4A09c3135936C7B1595D6b3A779d3",
    vault: "0xFaB3989658312862408eECCB6D815B95dC161ED0",
  },
};
