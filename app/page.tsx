// /app/page.tsx
import Link from 'next/link';
import { PlusCircle, Camera as CameraIcon, Aperture } from 'lucide-react';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatToBurmesePrice } from '@/lib/utils';

async function getLatestPrice(itemId: string, type: 'camera' | 'lens') {
    const entry = await prisma.priceEntry.findFirst({
        where: type === 'camera' ? { cameraId: itemId } : { lensId: itemId },
        orderBy: { date: 'desc' }
    });
    return entry ? formatToBurmesePrice(entry.price) : 'စျေးနှုန်းမရှိသေးပါ';
}

export default async function HomePage() {
  const cameras = await prisma.camera.findMany({
    orderBy: { createdAt: 'desc' },
  });
  const lenses = await prisma.lens.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-12">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-4xl font-bold text-primary">CamCompare MM</h1>
          <p className="text-muted-foreground mt-2">သင်၏ ကင်မရာပစ္စည်းများ စျေးနှုန်းများကို ခြေရာခံ၊ နှိုင်းယှဉ်ပြီး မှတ်သားရန်နေရာ</p>
        </div>
      </header>

      {/* Tracked Cameras Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">ခြေရာခံနေသော ကင်မရာများ</h2>
          <Link href="/camera/new">
            <Button>
              <PlusCircle size={20} className="mr-2" />
              <span>ကင်မရာအသစ်ထည့်မည်</span>
            </Button>
          </Link>
        </div>
        {cameras.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cameras.map(async (camera) => {
              const latestPrice = await getLatestPrice(camera.id, 'camera');
              return (
                <Link key={camera.id} href={`/camera/${camera.id}`} className="block group">
                  <Card className="hover:border-primary/80 transition-colors h-full flex flex-col">
                    <CardHeader className="p-0">
                      <img src={camera.imageUrl || 'https://placehold.co/400x300/171717/ffffff?text=No+Image'} alt={camera.model} className="w-full h-40 object-cover rounded-t-lg bg-muted" />
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between flex-grow p-4">
                      <div>
                          <CardDescription>{camera.brand}</CardDescription>
                          <CardTitle className="text-xl mt-1 group-hover:text-primary transition-colors">{camera.model}</CardTitle>
                      </div>
                      <p className="text-lg font-semibold text-primary mt-4">{latestPrice}</p>
                    </CardContent>
                  </Card>
                </Link>
              )}
            )}
          </div>
        ) : (
          <div className="text-center py-10 bg-secondary rounded-lg">
            <p className="text-muted-foreground">ခြေရာခံထားသော ကင်မရာများ မရှိသေးပါ။</p>
            <p className="text-sm text-muted-foreground mt-2">ကင်မရာအသစ်တစ်ခုထည့်ပြီး စတင်လိုက်ပါ။</p>
          </div>
        )}
      </section>

      {/* Tracked Lenses Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">ခြေရာခံနေသော မှန်ဘီလူးများ</h2>
           <Link href="/lens/new">
             <Button>
               <PlusCircle size={20} className="mr-2" />
               <span>မှန်ဘီလူးအသစ်ထည့်မည်</span>
             </Button>
           </Link>
        </div>
        {lenses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lenses.map(async (lens) => {
              const latestPrice = await getLatestPrice(lens.id, 'lens');
              return (
                  <Link key={lens.id} href={`/lens/${lens.id}`} className="block group">
                      <Card className="hover:border-primary/80 transition-colors h-full flex flex-col">
                      <CardHeader className="p-0">
                          <img src={lens.imageUrl || 'https://placehold.co/400x300/171717/ffffff?text=No+Image'} alt={lens.name} className="w-full h-40 object-cover rounded-t-lg bg-muted" />
                      </CardHeader>
                      <CardContent className="p-4 flex flex-col justify-between flex-grow">
                          <div>
                              <CardDescription>{lens.brand}</CardDescription>
                              <CardTitle className="text-lg mt-1 group-hover:text-primary transition-colors">{lens.name}</CardTitle>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                  <span className="flex items-center gap-1"><CameraIcon size={14}/> {lens.focalLengthMin}-{lens.focalLengthMax}mm</span>
                                  <span className="flex items-center gap-1"><Aperture size={14}/> f/{lens.apertureMin}</span>
                              </div>
                          </div>
                          <p className="text-lg font-semibold text-primary mt-4">{latestPrice}</p>
                      </CardContent>
                      </Card>
                  </Link>
              )
            })}
          </div>
        ) : (
           <div className="text-center py-10 bg-secondary rounded-lg">
            <p className="text-muted-foreground">ခြေရာခံထားသော မှန်ဘီလူးများ မရှိသေးပါ။</p>
            <p className="text-sm text-muted-foreground mt-2">မှန်ဘီလူးအသစ်တစ်ခုထည့်ပြီး စတင်လိုက်ပါ။</p>
          </div>
        )}
      </section>
    </div>
  );
}