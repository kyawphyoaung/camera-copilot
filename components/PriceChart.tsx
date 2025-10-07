// /components/PriceChart.tsx
'use client';

import { formatToBurmesePrice } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// `any` အစား တိကျတဲ့ type ကို သတ်မှတ်ခြင်း
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-lg">
        <p className="label">{`Date : ${label}`}</p>
        <p className="intro" style={{ color: payload[0].color }}>
          {/* payload value က number ဖြစ်ကြောင်း သေချာစေရန် type assertion ထည့်ခြင်း */}
          {`Price : ${formatToBurmesePrice(payload[0].value as number)}`}
        </p>
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