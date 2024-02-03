export default function Deposit() {
  return (
    <div className="flex flex-col justify-between p-8 rounded-xl max-w-[700px] max-md:px-5 bg-[#1A1A1A]">
      <div className="flex gap-5 justify-between px-4 text-sm font-semibold text-[color(display-p3_0.6314_0.6314_0.6667)] max-md:flex-wrap max-md:max-w-full">
        <div>Note Nº 224</div>
        <div className="text-[color(display-p3_0.9804_0.9804_0.9804)]">
          Deposit
        </div>
        <div>Mint</div>
        <div>LP</div>
        <div>Earn</div>
      </div>
      <div className="flex flex-col justify-center items-start px-16 mt-2.5 max-md:px-5 max-md:max-w-full">
        <div className="ml-32 h-0.5 w-[65px] max-md:ml-2.5" />
      </div>
      <div className="flex gap-5 justify-between px-4 mt-12 text-sm font-semibold max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex-auto text-[color(display-p3_0.6314_0.6314_0.6667)]">
          Total collateral: $10,801
        </div>
        <div className="flex-auto text-[color(display-p3_0.9804_0.9804_0.9804)]">
          Collateralization ratio: 320%
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-12 text-sm leading-4 whitespace-nowrap text-[color(display-p3_0.9804_0.9804_0.9804_/_0.98)] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col justify-between px-6 py-7 rounded-sm h-[100px] max-md:px-5 bg-zinc-300">
          <div>
            <span className="font-semibold">wETH</span>{" "}
          </div>
          <div className="mt-3 font-semibold">$6,080</div>
        </div>
        <div className="flex flex-col justify-between px-6 py-7 rounded-sm h-[100px] max-md:px-5">
          <div>
            <span className="font-semibold">wstETH</span>{" "}
          </div>
          <div className="mt-3 font-semibold">$1,200</div>
        </div>
        <div className="flex flex-col justify-between px-6 py-7 rounded-sm h-[100px] max-md:px-5">
          <div>
            <span className="font-semibold">sfrxETH</span>{" "}
          </div>
          <div className="mt-3 font-semibold">$4,500</div>
        </div>
        <div className="flex flex-col justify-between px-5 py-7 rounded-sm h-[100px]">
          <div>
            <span className="font-semibold">Kerosene</span>{" "}
          </div>
          <div className="mt-3 font-semibold">$4,500</div>
        </div>
        <div className="flex flex-col justify-center px-5 py-7 rounded-sm h-[100px]">
          <div>
            <span className="font-semibold">+</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
