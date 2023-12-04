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
    dyad: "0x74fc5aD0182d20F860F37703E7b04a7535c31DC2",
    vaultManager: "0xc19BbD68c264804885fA3be667843e39a2b3699A",
    staking: "0x9D5Fd41ee4A4A09c3135936C7B1595D6b3A779d3",
    vault: "0x50228B06DAd02fd6703CC2506830BFec1169C7fa",
    weth: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  },
};
