export default function Mint() {
  return (
    <div className="flex flex-col justify-between p-8 text-sm font-semibold rounded-xl max-w-[700px] text-[color(display-p3_0.6314_0.6314_0.6667)] max-md:px-5 bg-[#1A1A1A]">
      <div className="flex gap-5 justify-between px-4 max-md:flex-wrap max-md:max-w-full">
        <div>Note Nº 224</div>
        <div>Deposit</div>
        <div className="text-[color(display-p3_0.9804_0.9804_0.9804)]">
          Mint
        </div>
        <div>LP</div>
        <div>Earn</div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5 justify-between mt-12 whitespace-nowrap text-[color(display-p3_1_1_1)] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="grow justify-center items-start py-3 pr-16 pl-2.5 rounded-md border-solid border-[0.5px] border-[color(display-p3_0.2625_0.2625_0.2625)] text-[color(display-p3_0.6314_0.6314_0.6667)] max-md:pr-5">
            Amount of DYAD to mint
          </div>
          <div className="justify-center px-6 py-3 rounded-md border border-solid aspect-[1.9] border-[color(display-p3_0.2039_0.2039_0.2039)] max-md:px-5">
            Max
          </div>
          <div className="justify-center px-12 py-3 rounded-md max-md:px-5">
            Mint
          </div>
        </div>
        <div className="flex gap-5 justify-between px-2.5 mt-10 max-md:flex-wrap max-md:max-w-full">
          <div className="flex-auto">DYAD minted: 3,000</div>
          <div className="flex-auto">Current CR: 300%</div>
          <div className="flex-auto text-[color(display-p3_0.9804_0.9804_0.9804)]">
            New CR: 320%
          </div>
        </div>
        <div className="flex gap-5 justify-between mt-10 whitespace-nowrap text-[color(display-p3_1_1_1)] max-md:flex-wrap max-md:max-w-full">
          <div className="grow justify-center items-start py-3 pr-16 pl-2.5 rounded-md border-solid border-[0.5px] border-[color(display-p3_0.2625_0.2625_0.2625)] text-[color(display-p3_0.6314_0.6314_0.6667)] max-md:pr-5">
            Amount of DYAD to burn
          </div>
          <div className="justify-center px-6 py-3 rounded-md border border-solid aspect-[1.9] border-[color(display-p3_0.2039_0.2039_0.2039)] max-md:px-5">
            Max
          </div>
          <div className="justify-center px-12 py-3 rounded-md max-md:px-5">
            Burn
          </div>
        </div>
      </div>
    </div>
  );
}
