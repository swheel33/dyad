interface Deployment {
  dnft: string;
  vaultManagerSLL: string;
  vaultSLL: string;
  dyad: string;
  vaultManager: string;
  staking: string;
  vault: string;
  weth: string;
}

export const deployments: { [id: string]: Deployment } = {
  // "1": {
  //   dnft: "0xdc400bbe0b8b79c07a962ea99a642f5819e3b712",
  // },
  "5": {
    dnft: "0x952E31dFeEB29F5398a36602E0E276F2b09B6651",
    vaultManagerSLL: "0x0686d75307040EE0C86790D0a62b6c95e3E857C9",
    vaultSLL: "0x25B716D9dCc09842413161abF0F3ff336d165a87",
    dyad: "0x397bf4E4d95c55f12bF0D629Ba42AbF2d629d79c",
    vaultManager: "0xC48B1bDfAD6B3a5D54EEbb48A2Eb70Cd4e7760bc",
    staking: "0x9D5Fd41ee4A4A09c3135936C7B1595D6b3A779d3",
    vault: "0x2AF67FB7188ABb1f4ddBefc1Ce6177D0F09a21bf",
    weth: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  },
};
