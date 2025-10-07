// /components/PriceChart.tsx
// Recharts library သည် client-side hooks များအသုံးပြုသောကြောင့် ၎င်းကို Client Component အဖြစ် သီးသန့်ခွဲထုတ်ထားသည်။

'use client';

import { formatToLakhs } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Custom Tooltip for Chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-lg">
        <p className="label">{`Date : ${label}`}</p>
        <p className="intro" style={{ color: payload[0].color }}>{`Price : ${formatToLakhs(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

interface PriceChartProps {
    data: { date: string; price: number }[];
    strokeColor: string;
}

export default function PriceChart({ data, strokeColor }: PriceChartProps) {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${Number(value) / 100000} သိန်း`} domain={['dataMin - 100000', 'dataMax + 100000']} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke={strokeColor} strokeWidth={2} name="MMK Price" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
