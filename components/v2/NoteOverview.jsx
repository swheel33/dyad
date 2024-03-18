// component
export default function NoteOverview() {
  return (
    <div className="flex flex-col justify-between p-8 rounded-xl max-w-[700px] max-md:px-5 bg-[#1A1A1A]">
      <div className="flex gap-5 justify-between px-4 text-sm font-semibold text-[color(display-p3_0.6314_0.6314_0.6667)] max-md:flex-wrap max-md:max-w-full">
        <div className="text-[color(display-p3_0.9804_0.9804_0.9804)]">
          Note Nº 223
        </div>
        <div>Deposit</div>
        <div>Mint</div>
        <div>LP</div>
        <div>Earn</div>
      </div>
      <div className="shrink-0 mt-2.5 h-0.5 max-md:max-w-full" />
      <div className="justify-center mt-14 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-0 justify-between self-stretch text-sm font-semibold text-[color(display-p3_0.6314_0.6314_0.6667)] max-md:mt-10">
              <div className="flex flex-col flex-1 justify-between py-7 pr-1 pl-4">
                <div className="whitespace-nowrap text-[color(display-p3_0.9804_0.9804_0.9804)]">
                  DYAD mint cost
                </div>
                <div className="mt-7">Momentum</div>
                <div className="mt-7">LP stake</div>
              </div>
              <div className="flex flex-col flex-1 justify-between py-7 pr-4 pl-16 whitespace-nowrap max-md:pl-5">
                <div className="text-[color(display-p3_0.9804_0.9804_0.9804)]">
                  $0.78
                </div>
                <div className="self-start mt-7 ml-2.5">2.5x</div>
                <div className="mt-7">1.85%</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-0 justify-between self-stretch text-sm font-semibold text-[color(display-p3_0.6314_0.6314_0.6667)] max-md:mt-10">
              <div className="flex flex-col flex-1 justify-between py-7 pl-4">
                <div className="text-[color(display-p3_0.9804_0.9804_0.9804)]">
                  Collateralization ratio
                </div>
                <div className="mt-7 whitespace-nowrap">DYAD minted</div>
                <div className="mt-7">Collateral</div>
              </div>
              <div className="flex flex-col flex-1 justify-between items-start py-7 pr-4 pl-14 whitespace-nowrap max-md:pl-5">
                <div className="ml-4 text-[color(display-p3_0.9804_0.9804_0.9804)] max-md:ml-2.5">
                  385%
                </div>
                <div className="mt-7 ml-4 max-md:ml-2.5">3,000</div>
                <div className="self-stretch mt-7">$10,805</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
