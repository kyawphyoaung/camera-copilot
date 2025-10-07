// /app/camera/[id]/add-price/page.tsx
import prisma from "@/lib/prisma";
import AddPriceForm from "./add-price-form"; // ကျွန်တော်တို့ နာမည်ပြောင်းထားတဲ့ component

export default async function AddPricePage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  
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
    <AddPriceForm paramsPromise={paramsPromise} shopNames={shopNames} />
  );
}