import EditVaultTabContent from "@/components/Modals/NoteCardModals/DepositModals/EditVault/EditVaultTabContent";
import Deposit from "@/components/NoteCard/Children/Deposit";
import Mint from "@/components/NoteCard/Children/Mint";
import NoteNumber from "@/components/NoteCard/Children/NoteNumber";
import ButtonComponent from "@/components/reusable/ButtonComponent";
import {
  NoteNumberDataModel,
  VaultCardDataModel,
} from "@/models/NoteCardModels";
import { TabsDataModel } from "@/models/TabsModel";

export const NOTE_NUMBER_MOCK_DATA: NoteNumberDataModel = {
  left: [
    {
      text: "DYAD mint cost",
      value: "$0.78",
      highlighted: true,
    },
    {
      text: "Momentum",
      value: "2.5x",
      highlighted: false,
    },
    {
      text: "LP stake",
      value: "1.85%",
      highlighted: false,
    },
  ],
  right: [
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
  ],
};

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
    label: "Deposit",
    tabKey: "Deposit",
    content: (
      <Deposit
        total_collateral="$10,801"
        collateralization_ratio="320%"
        vault_cards={VAULT_CARDS_DATA}
      />
    ),
  },
  {
    label: "Mint",
    tabKey: "Mint",
    content: <Mint dyadMinted="3,000" currentCr="300%" newCr="320%" />,
  },
  {
    label: "LP",
    tabKey: "LP",
    content: (
      <div>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text. All the Lorem Ipsum
        generators on the Internet tend to repeat predefined chunks as
        necessary, making this the first true generator on the Internet. It uses
        a dictionary of over 200 Latin words, combined with a handful of model
        sentence structures, to generate Lorem Ipsum which looks reasonable. The
        generated Lorem Ipsum is therefore always free from repetition, injected
        humour, or non-characteristic words etc.
      </div>
    ),
  },
  {
    label: "Earn",
    tabKey: "Earn",
    content: (
      <div>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </div>
    ),
  },
];

export const getVaultModalData = (currency: string) => [
  {
    label: "Deposit",
    tabKey: "Deposit",
    content: (
      <EditVaultTabContent
        currentCollateralizationRatio="300%"
        newCollateralizationRatio="320%"
        currency={currency}
      />
    ),
  },
  {
    label: "Withdraw",
    tabKey: "Withdraw",
    content: (
      <EditVaultTabContent
        currentCollateralizationRatio="300%"
        newCollateralizationRatio="320%"
        currency={currency}
      />
    ),
  },
  {
    label: "Redeem",
    tabKey: "Redeem",
    content: (
      <EditVaultTabContent
        currentCollateralizationRatio="300%"
        newCollateralizationRatio="320%"
        currency={currency}
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
    key: "1",
    collateral: "wstETH",
    oracle_price: "$2300",
    tvl: "$800,000",
    action: <ButtonComponent>Add</ButtonComponent>,
  },
  {
    key: "1",
    collateral: "sfrxETH ",
    oracle_price: "$2300",
    tvl: "$800,000",
    action: <ButtonComponent>Add</ButtonComponent>,
  },
  {
    key: "1",
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
