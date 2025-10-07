// /app/lens/[id]/page.tsx
// မှန်ဘီလူး (Lens) တစ်ခုချင်းစီရဲ့ အသေးစိတ်အချက်အလက်၊ စျေးနှုန်းမှတ်တမ်းနဲ့ ရိုက်ကူးနိုင်မှု အကြံပြုချက်များ။

'use client';

import { Lens } from '@/types';
import { formatToLakhs, getLensSuggestions } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowLeft, Camera, Aperture, CheckCircle, BarChart, PlusCircle } from 'lucide-react';

// Mock Data - In a real app, you'd fetch this data based on the `id` param
const MOCK_LENS: Lens = {
    id: 'sigma1850',
    name: '18-50mm F2.8 DC DN',
    brand: 'Sigma',
    imageUrl: 'https://placehold.co/400x300/222/fff?text=Sigma+18-50',
    focalLength: { min: 18, max: 50 },
    aperture: { min: 2.8, max: 22 },
    mountType: 'E',
    type: 'DN',
    priceEntries: [
        { id: 'l1', shopName: 'Pro Photo', price: 1850000, date: '2024-04-20', isSecondHand: false },
        { id: 'l2', shopName: 'Camera City', price: 1900000, date: '2024-05-15', isSecondHand: false }
    ],
    referencePriceUSD: 549,
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

export default function LensDetailPage({ params }: { params: { id: string } }) {
    const lens = MOCK_LENS; // Replace with actual data fetching
    if (!lens) return <div>Lens not found</div>;

    const suggestions = getLensSuggestions(lens.focalLength, lens.aperture);
    const chartData = lens.priceEntries.map(p => ({
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
                <img src={lens.imageUrl} alt={lens.name} className="w-48 h-32 object-cover rounded-lg bg-gray-700" />
                <div>
                    <p className="text-muted-foreground">{lens.brand}</p>
                    <h1 className="text-3xl font-bold">{lens.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
                        <span className="flex items-center gap-1"><Camera size={16}/> {lens.focalLength.min}-{lens.focalLength.max}mm</span>
                        <span className="flex items-center gap-1"><Aperture size={16}/> f/{lens.aperture.min}</span>
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{lens.mountType}-Mount</span>
                         <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{lens.type}</span>
                    </div>
                </div>
            </header>

            {/* Suggestions Section */}
            <div className="bg-secondary p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">အသုံးပြုနိုင်မှု အကြံပြုချက်များ</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold">{suggestion.title}</h3>
                                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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
                            <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} name="MMK Price" />
                        </LineChart>
                    </ResponsiveContainer>
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
                    {lens.priceEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(entry => (
                        <div key={entry.id} className="bg-background p-3 rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-bold">{entry.shopName}</p>
                                <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                            </div>
                            <p className="font-bold text-lg">{formatToLakhs(entry.price)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
