import { useEffect, useState } from "react";
import useEthPrice from "./useEthPrice";

export default function useCR(usdValue, dyadMinted, newAmountAdded = 0) {
  const [cr, setCR] = useState(0);

  const { ethPrice } = useEthPrice();

  useEffect(() => {
    // to uint
    usdValue = parseFloat(usdValue) / 10 ** 18;
    dyadMinted = parseFloat(dyadMinted) / 10 ** 18;
    newAmountAdded = parseFloat(newAmountAdded);

    const amountAddedInEth = newAmountAdded * ethPrice;
    const newUsdValue = usdValue + parseFloat(amountAddedInEth);
    const newCR = newUsdValue / dyadMinted;

    // check if not nan
    if (newCR !== newCR) {
      setCR(null);
    } else {
      setCR(newCR * 100);
    }
  }, [newAmountAdded]);

  return { cr };
}
