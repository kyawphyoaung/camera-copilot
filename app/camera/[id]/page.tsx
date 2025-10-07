// /app/camera/[id]/page.tsx
// ကင်မရာတစ်ခုချင်းစီရဲ့ အသေးစိတ်အချက်အလက်၊ စျေးနှုန်းမှတ်တမ်းနဲ့ Chart ကိုပြမယ့် စာမျက်နှာပါ။

'use client';
import { useState } from 'react';
import { Camera, PriceEntry } from '@/types';
import { formatToLakhs } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, DollarSign, BarChart, PlusCircle } from 'lucide-react';

// Mock Data - In a real app, you'd fetch this data based on the `id` param
const MOCK_CAMERA: Camera = {
    id: 'a6400',
    model: 'Alpha a6400',
    brand: 'Sony',
    imageUrl: 'https://placehold.co/400x300/222/fff?text=Sony+a6400',
    priceEntries: [
      { id: 'p1', shopName: 'Camera Shop A', price: 3300000, date: '2024-04-10', isSecondHand: false },
      { id: 'p2', shopName: 'Online Seller B', price: 3250000, date: '2024-04-25', isSecondHand: false },
      { id: 'p3', shopName: 'Camera Shop C', price: 2800000, date: '2024-05-10', isSecondHand: true, shutterCount: 15000, condition: 85 },
      { id: 'p6', shopName: 'Camera Shop A', price: 3400000, date: '2024-05-22', isSecondHand: false },
    ],
    referencePriceUSD: 899,
};

// Custom Tooltip for Chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-lg">
        <p className="label">{`Date : ${label}`}</p>
        <p className="intro" style={{color: payload[0].color}}>{`Price : ${formatToLakhs(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};


export default function CameraDetailPage({ params }: { params: { id: string } }) {
    const camera = MOCK_CAMERA; // Replace with actual data fetching
    const [usdRate, setUsdRate] = useState(3800); // User input for dollar rate

    if (!camera) return <div>Camera not found</div>;

    const latestPrice = camera.priceEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    const effectiveExchangeRate = latestPrice && camera.referencePriceUSD ? (latestPrice.price / camera.referencePriceUSD).toFixed(0) : 'N/A';
    
    const forecastPrice = camera.referencePriceUSD ? (camera.referencePriceUSD * usdRate) : 0;

    const chartData = camera.priceEntries.map(p => ({
        date: new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short'}),
        price: p.price,
    })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="space-y-6">
            <a href="/" className="flex items-center gap-2 text-primary hover:underline">
                <ArrowLeft size={18} />
                <span>နောက်သို့</span>
            </a>
            
            <header className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <img src={camera.imageUrl} alt={camera.model} className="w-48 h-32 object-cover rounded-lg bg-gray-700" />
                <div>
                    <p className="text-muted-foreground">{camera.brand}</p>
                    <h1 className="text-3xl font-bold">{camera.model}</h1>
                </div>
            </header>

            {/* Price Chart */}
            <div className="bg-secondary p-4 rounded-lg">
                 <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><BarChart size={22}/> စျေးနှုန်း အတက်အကျမှတ်တမ်း</h2>
                 <div style={{width: '100%', height: 300}}>
                    <ResponsiveContainer>
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
                            <XAxis dataKey="date" />
                            <YAxis tickFormatter={(value) => `${value/100000} သိန်း`} domain={['dataMin - 100000', 'dataMax + 100000']}/>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} name="MMK Price" />
                        </LineChart>
                    </ResponsiveContainer>
                 </div>
            </div>

            {/* Analysis & Forecast */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-secondary p-4 rounded-lg space-y-3">
                    <h2 className="text-xl font-semibold flex items-center gap-2"><DollarSign size={22}/> စျေးနှုန်း သုံးသပ်ချက်</h2>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">နိုင်ငံတကာ ပေါက်စျေး (USD):</span>
                        <span className="font-bold">${camera.referencePriceUSD}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">နောက်ဆုံးမှတ်တမ်းတင်စျေး:</span>
                        <span className="font-bold text-green-400">{formatToLakhs(latestPrice.price)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">တွက်ချက်ရရှိသော Exchange Rate:</span>
                        <span className="font-bold">{effectiveExchangeRate} MMK/USD</span>
                    </div>
                </div>
                <div className="bg-secondary p-4 rounded-lg space-y-3">
                    <h2 className="text-xl font-semibold">ခန့်မှန်းချက် (Forecast)</h2>
                    <div className="flex items-center gap-2">
                         <label htmlFor="usdRate" className="text-muted-foreground">USD Rate ထည့်ပါ:</label>
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
                        <span className="font-bold text-yellow-400">{formatToLakhs(forecastPrice)}</span>
                    </div>
                </div>
            </div>

            {/* Price History */}
            <div className="bg-secondary p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">စျေးနှုန်း မှတ်တမ်းများ</h2>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">
                        <PlusCircle size={18} />
                        <span>စျေးနှုန်းသစ်ထည့်မည်</span>
                    </button>
                </div>
                <div className="space-y-3">
                    {camera.priceEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(entry => (
                        <div key={entry.id} className="bg-background p-3 rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-bold">{entry.shopName}</p>
                                <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                                {entry.isSecondHand && (
                                    <div className="text-xs text-yellow-400 mt-1">
                                        <span>Second Hand | Shutter: {entry.shutterCount?.toLocaleString()} | Condition: {entry.condition}%</span>
                                    </div>
                                )}
                            </div>
                            <p className="font-bold text-lg">{formatToLakhs(entry.price)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
