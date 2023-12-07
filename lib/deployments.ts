interface Deployment {
  dnft: string;
  vaultManagerSLL: string;
  vaultSLL: string;
  dyad: string;
  vaultManager: string;
  staking: string;
  vault: string;
  weth: string;
  payments: string;
}

export const deployments: { [id: string]: Deployment } = {
  // "1": {
  //   dnft: "0xdc400bbe0b8b79c07a962ea99a642f5819e3b712",
  // },
  "5": {
    dnft: "0x952E31dFeEB29F5398a36602E0E276F2b09B6651",
    vaultManagerSLL: "0x0686d75307040EE0C86790D0a62b6c95e3E857C9",
    vaultSLL: "0x25B716D9dCc09842413161abF0F3ff336d165a87",
    dyad: "0x45f254f3Fbb4b2Af24BAa8FB29FE85146615918A",
    vaultManager: "0xAEe4Ef2d655E2fBC062dD3c48E048a99dF86F576",
    staking: "0x9D5Fd41ee4A4A09c3135936C7B1595D6b3A779d3",
    vault: "0xF961888637313acBba9aEcDf8779fb93A7F65A42",
    weth: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    payments: "0xe9c69Ccec4EdB261C805102F46CfC01cE1a9ce5b",
  },
};
