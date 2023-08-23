import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: {
    minted: number;
    shares: number;
    timestamp: number;
  }[];
}

export default function DnftChart({ data }: Props) {
  return (
    <AreaChart
      width={600}
      height={250}
      data={data}
      margin={{ top: 30, right: 30, left: 30, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorDyad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#b0b0b0" stopOpacity={0.8} />{" "}
          <stop offset="95%" stopColor="#b0b0b0" stopOpacity={0} />
        </linearGradient>

        <linearGradient id="colorCollateral" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#7a7a7a" stopOpacity={0.8} />{" "}
          <stop offset="95%" stopColor="#7a7a7a" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="timestamp"
        tickLine={false}
        axisLine={false}
        tickFormatter={(value: any, index: number) =>
          index === 0
            ? ""
            : new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
        }
      />
      <YAxis
        tickLine={false}
        axisLine={false}
        tickFormatter={(value: any) => {
          return Number(value).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          });
        }}
      />
      {/* Medium-dark gray for gridlines in dark mode */}
      <Tooltip />
      <Area
        type="monotone"
        dataKey="minted"
        stroke="#b0b0b0"
        fillOpacity={1}
        fill="url(#colorDyad)"
      />
      <Area
        type="monotone"
        dataKey="shares"
        stroke="#7a7a7a"
        fillOpacity={1}
        fill="url(#colorCollateral)"
      />
    </AreaChart>
  );
}
