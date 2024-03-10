import LpStakeModalTab from "@/components/Modals/NoteCardModals/LpModals/LpStakeModalTab";
import Deposit from "@/components/NoteCard/Children/Deposit";
import Earn from "@/components/NoteCard/Children/Earn";
import Fuse from "@/components/NoteCard/Children/Fuse";
import Lp from "@/components/NoteCard/Children/Lp";
import Mint from "@/components/NoteCard/Children/Mint";
import NoteNumber from "@/components/NoteCard/Children/NoteNumber";
import ButtonComponent from "@/components/reusable/ButtonComponent";
import {
  NoteNumberDataColumnModel,
  VaultCardDataModel,
} from "@/models/NoteCardModels";
import { TabsDataModel } from "@/models/TabsModel";

export const NOTE_NUMBER_MOCK_DATA: NoteNumberDataColumnModel[] = [
  {
    text: "Collateralization ratio",
    value: "385%",
    highlighted: true,
  },
  {
    text: "DYAD minted",
    value: "3,000",
    highlighted: false,
  },
  {
    text: "Collateral",
    value: "$10,805",
    highlighted: false,
  },
  {
    text: "Fused Kerosene",
    value: "800",
    highlighted: false,
  },
];

export const VAULT_CARDS_DATA: VaultCardDataModel[] = [
  {
    currency: "wETH",
    value: "$6,080",
  },
  {
    currency: "wstETH ",
    value: "$1,200",
  },
  {
    currency: "sfrxETH ",
    value: "$4,500",
  },
  {
    currency: "Kerosene",
    value: "$4,500",
  },
  // {
  //   currency: "Kerosene",
  //   value: "$4,500",
  // },
];

export const TABS_MOCK_DATA: TabsDataModel[] = [
  {
    label: "Note Nº 223",
    tabKey: "Note Nº 223",
    content: (
      <div>
        <NoteNumber data={NOTE_NUMBER_MOCK_DATA} />
      </div>
    ),
  },
  {
    label: "Deposit and Withdraw",
    tabKey: "Deposit and Withdraw",
    content: (
      <Deposit
        total_collateral="$10,801"
        collateralization_ratio="320%"
        vault_cards={VAULT_CARDS_DATA}
      />
    ),
  },
  {
    label: "Mint DYAD",
    tabKey: "Mint DYAD",
    content: <Mint dyadMinted="3,000" currentCr="300%" newCr="320%" />,
  },
  // {
  //   label: "LP",
  //   tabKey: "LP",
  //   content: (
  //     <Lp totalStake="$18,043" totalPercentage="1.30%" momentum="2.5x" />
  //   ),
  // },
  // {
  //   label: "Earn",
  //   tabKey: "Earn",
  //   content: (
  //     <div>
  //       <Earn apy="8.7%" currentCr="300%" newCr="320%" />
  //     </div>
  //   ),
  // },
  {
    label: "Fuse Kerosene",
    tabKey: "Fuse Kerosene",
    content: (
      <div>
        <Fuse fusedKerosene="400" currentCr="300%" newCr="320%" />
      </div>
    ),
  },
];

export const getLpModalData = (pool: string) => [
  {
    label: "Stake",
    tabKey: "Stake",
    content: (
      <LpStakeModalTab NewMomentum="2.2x" currentMomentum="2.5x" pool={pool} />
    ),
  },
  {
    label: "Unstake",
    tabKey: "Unstake",
    content: (
      <LpStakeModalTab
        NewMomentum="2.2x"
        currentMomentum="2.5x"
        pool={pool}
        type="unstake"
      />
    ),
  },
];

export const rows = [
  {
    key: "1",
    collateral: "wETH",
    oracle_price: "$2300",
    tvl: "$800,000",
    action: <ButtonComponent>Add</ButtonComponent>,
  },
  {
    key: "2",
    collateral: "wstETH",
    oracle_price: "$2300",
    tvl: "$800,000",
    action: <ButtonComponent>Add</ButtonComponent>,
  },
  {
    key: "3",
    collateral: "sfrxETH ",
    oracle_price: "$2300",
    tvl: "$800,000",
    action: <ButtonComponent>Add</ButtonComponent>,
  },
  {
    key: "4",
    collateral: "Kerosene ",
    oracle_price: "$2300",
    tvl: "$800,000",
    action: <ButtonComponent>Add</ButtonComponent>,
  },
];

export const columns = [
  {
    key: "collateral",
    label: "Collateral",
  },
  {
    key: "oracle_price",
    label: "Oracle price",
  },
  {
    key: "tvl",
    label: "TVL",
  },
  {
    key: "action",
    label: "",
  },
];

export const LpRows = [
  {
    key: "ETH - DYAD (Uniswap)",
    pool: "ETH - DYAD (Uniswap)",
    staked: "$2300",
    tvl: "$800,000",
  },
  {
    key: "USDC - DYAD (Uniswap)",
    pool: "USDC - DYAD (Uniswap)",
    staked: "$2300",
    tvl: "$800,000",
  },
  {
    key: "LUSD - DYAD (Zero)",
    pool: "LUSD - DYAD (Zero)",
    staked: "$2300",
    tvl: "$800,000",
  },
  {
    key: "ETH - DYAD (Zero)",
    pool: "ETH - DYAD (Zero)",
    staked: "$2300",
    tvl: "$800,000",
  },
];

export const LpColumns = [
  {
    key: "pool",
    label: "Pool",
  },
  {
    key: "staked",
    label: "Staked",
  },
  {
    key: "tvl",
    label: "TVL",
  },
];

export const PIE_CHART_MOCK_DATA = {
  labels: ["label 1", "label 2", "label 3"],
  width: "50",
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: ["#8D8D8D", "#676767", "#EDEDED"],
      borderColor: ["#8D8D8D", "#676767", "#EDEDED"],
      borderWidth: 1,
    },
  ],
};
