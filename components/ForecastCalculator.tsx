// /components/ForecastCalculator.tsx
// User input (useState) လိုအပ်သောကြောင့် ဤအပိုင်းကို Client Component အဖြစ် သီးသန့်ခွဲထုတ်ထားသည်။

'use client';

import { useState } from 'react';
import { formatToBurmesePrice } from '@/lib/utils';

interface ForecastCalculatorProps {
    referencePriceUSD: number | null | undefined;
}

export default function ForecastCalculator({ referencePriceUSD }: ForecastCalculatorProps) {
    const [usdRate, setUsdRate] = useState(3800);

    const forecastPrice = referencePriceUSD ? (referencePriceUSD * usdRate) : 0;

    return (
        <div className="bg-secondary p-4 rounded-lg space-y-3">
            <h2 className="text-xl font-semibold">ခန့်မှန်းချက် (Forecast)</h2>
            <div className="flex items-center gap-2">
                <label htmlFor="usdRate" className="text-muted-foreground whitespace-nowrap">USD Rate ထည့်ပါ:</label>
                <input
                    type="number"
                    id="usdRate"
                    value={usdRate}
                    onChange={(e) => setUsdRate(Number(e.target.value))}
                    className="bg-input p-2 rounded-md w-full"
                />
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">ဖြစ်နိုင်ချေရှိသော စျေးနှုန်း:</span>
                <span className="font-bold text-yellow-400">{formatToBurmesePrice(forecastPrice)}</span>
            </div>
        </div>
    );
}
