// /app/lens/[id]/add-price/page.tsx
import prisma from "@/lib/prisma";
import AddLensPriceForm from "./add-lens-price-form";

export default async function AddLensPricePage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  
  // Database မှ ရှိပြီးသား ဆိုင်နာမည်များ (unique) ကို ဆွဲထုတ်ခြင်း
  const shopNameEntries = await prisma.priceEntry.findMany({
    select: {
      shopName: true,
    },
    distinct: ['shopName'],
    orderBy: {
      shopName: 'asc'
    }
  });

  const shopNames = shopNameEntries.map(entry => entry.shopName);

  return (
    <AddLensPriceForm paramsPromise={paramsPromise} shopNames={shopNames} />
  );
}