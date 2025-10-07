// /app/camera/[id]/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { formatToLakhs } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, DollarSign, BarChart, PlusCircle, Info } from 'lucide-react';
import PriceChart from '@/components/PriceChart';
import ForecastCalculator from '@/components/ForecastCalculator';

export default async function CameraDetailPage({ params }: { params: { id: string } }) {
    const camera = await prisma.camera.findUnique({
        where: { id: params.id },
        include: {
            priceEntries: {
                orderBy: {
                    date: 'desc'
                }
            }
        }
    });

    if (!camera) {
        return notFound();
    }

    const latestPrice = camera.priceEntries[0];
    const effectiveExchangeRate = latestPrice && camera.referencePriceUSD ? (latestPrice.price / camera.referencePriceUSD).toFixed(0) : 'N/A';

    const chartData = camera.priceEntries.map(p => ({
        date: new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        price: p.price,
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
                <ArrowLeft size={18} />
                <span>နောက်သို့</span>
            </Link>
            
            <header className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <img src={camera.imageUrl || 'https://placehold.co/400x300/222/fff?text=No+Image'} alt={camera.model} className="w-48 h-32 object-cover rounded-lg bg-gray-700" />
                <div>
                    <p className="text-muted-foreground">{camera.brand}</p>
                    <h1 className="text-3xl font-bold">{camera.model}</h1>
                </div>
            </header>

            {/* Price Chart */}
            <div className="bg-secondary p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><BarChart size={22}/> စျေးနှုန်း အတက်အကျမှတ်တမ်း</h2>
                {chartData.length > 0 ? (
                    <PriceChart data={chartData} strokeColor="#8884d8" />
                ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center text-center">
                        <Info size={32} className="text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">စျေးနှုန်းမှတ်တမ်းများ မရှိသေးပါ။</p>
                        <p className="text-sm text-muted-foreground/80 mt-1">စျေးနှုန်းအသစ်တစ်ခုထည့်ပြီး Chart ကို စတင်အသုံးပြုနိုင်ပါတယ်။</p>
                    </div>
                )}
            </div>

            {/* Analysis & Forecast */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-secondary p-4 rounded-lg space-y-3">
                    <h2 className="text-xl font-semibold flex items-center gap-2"><DollarSign size={22}/> စျေးနှုန်း သုံးသပ်ချက်</h2>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">နိုင်ငံတကာ ပေါက်စျေး (USD):</span>
                        <span className="font-bold">{camera.referencePriceUSD ? `$${camera.referencePriceUSD}` : 'N/A'}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">နောက်ဆုံးမှတ်တမ်းတင်စျေး:</span>
                        <span className="font-bold text-green-400">{latestPrice ? formatToLakhs(latestPrice.price) : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">တွက်ချက်ရရှိသော Exchange Rate:</span>
                        <span className="font-bold">{effectiveExchangeRate} MMK/USD</span>
                    </div>
                </div>
                <ForecastCalculator referencePriceUSD={camera.referencePriceUSD} />
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
                    {camera.priceEntries.length > 0 ? (
                        camera.priceEntries.map(entry => (
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
                        ))
                    ) : (
                         <div className="text-center py-6">
                            <p className="text-muted-foreground">စျေးနှုန်းမှတ်တမ်းများ မရှိသေးပါ။</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}