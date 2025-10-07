// /app/lens/[id]/page.tsx
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { formatToBurmesePrice } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, Camera, Aperture, BarChart, PlusCircle, Info, CheckCircle } from 'lucide-react';
import PriceChart from '@/components/PriceChart';
import { getLensSuggestions } from '@/lib/utils';

export default async function LensDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const { id } = await paramsPromise;

    const lens = await prisma.lens.findUnique({
        where: { id },
        include: {
            priceEntries: {
                orderBy: {
                    date: 'desc'
                }
            }
        }
    });

    if (!lens) {
        return notFound();
    }

    const suggestions = getLensSuggestions(
        { min: lens.focalLengthMin, max: lens.focalLengthMax },
        { min: lens.apertureMin, max: lens.apertureMax }
    );
    
    const chartData = lens.priceEntries.map(p => ({
        date: p.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        price: p.price,
    })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    return (
        <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
                <ArrowLeft size={18} />
                <span>နောက်သို့</span>
            </Link>
            
            <header className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <img src={lens.imageUrl || 'https://placehold.co/400x300/222/fff?text=No+Image'} alt={lens.name} className="w-48 h-32 object-cover rounded-lg bg-gray-700" />
                <div>
                    <p className="text-muted-foreground">{lens.brand}</p>
                    <h1 className="text-3xl font-bold">{lens.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground mt-2">
                        <span className="flex items-center gap-1"><Camera size={16}/> {lens.focalLengthMin}-{lens.focalLengthMax}mm</span>
                        <span className="flex items-center gap-1"><Aperture size={16}/> f/{lens.apertureMin}</span>
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{lens.mountType}-Mount</span>
                         <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{lens.lensType}</span>
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
                 {chartData.length > 1 ? (
                    <PriceChart data={chartData} strokeColor="#82ca9d" />
                 ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center text-center">
                        <Info size={32} className="text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">စျေးနှုန်းမှတ်တမ်းများ Chart ဆွဲရန် မလုံလောက်ပါ။</p>
                        <p className="text-sm text-muted-foreground/80 mt-1">အနည်းဆုံး စျေးနှုန်းမှတ်တမ်း (၂) ခု လိုအပ်ပါသည်။</p>
                    </div>
                 )}
            </div>

            {/* Price History */}
            <div className="bg-secondary p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">စျေးနှုန်း မှတ်တမ်းများ</h2>
                     <Link 
                        href={`/lens/${lens.id}/add-price`} 
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                    >
                        <PlusCircle size={18} />
                        <span>စျေးနှုန်းသစ်ထည့်မည်</span>
                    </Link>
                </div>
                <div className="space-y-3">
                    {lens.priceEntries.length > 0 ? (
                        lens.priceEntries.map(entry => (
                            <div key={entry.id} className="bg-background p-3 rounded-md flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{entry.shopName}</p>
                                    <p className="text-sm text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-primary">{formatToBurmesePrice(entry.price)}</p>
                                    <p className="text-xs text-muted-foreground">{entry.price.toLocaleString()} MMK</p>
                                </div>
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