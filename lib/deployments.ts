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
    dnft: "0x8f49F321CB37A2313b7880A8A6495A8741Fdd23A",
    vaultManagerSLL: "0xE5E5e2A4bA2454897a347FC11C0fCfaF647Cab20",
    vaultSLL: "0x01f68eC7882222562041090F1A31B94487d040C6",
    dyad: "0xb8FbE3B08e013cF00610e9EDb415D987264b2303",
    vaultManager: "0x5190ce425AE45F42F8C76e36C01F4A0e3D0DF68b",
    staking: "0xca180CAE992474D54b5F9649Dc08c09AEded53d3",
    vault: "0x4C5C3BDb3Ebb0cA0118C9d758238CA5699b7BB42",
  },
};
