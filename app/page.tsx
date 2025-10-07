// /app/page.tsx
import Link from 'next/link';
import { PlusCircle, Camera as CameraIcon, Aperture } from 'lucide-react';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatToLakhs } from '@/lib/utils';


async function getLatestPrice(itemId: string, type: 'camera' | 'lens') {
    const entry = await prisma.priceEntry.findFirst({
        where: type === 'camera' ? { cameraId: itemId } : { lensId: itemId },
        orderBy: { date: 'desc' }
    });
    return entry ? formatToLakhs(entry.price) : 'စျေးနှုန်းမရှိသေးပါ';
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
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">CamCompare MM</h1>
          <p className="text-muted-foreground">သင်၏ ကင်မရာပစ္စည်းများ စျေးနှုန်းကို မှတ်သားရန်နေရာ</p>
        </div>
      </header>

      {/* Tracked Cameras Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">ခြေရာခံနေသော ကင်မရာများ</h2>
          <Button>
            <PlusCircle size={20} className="mr-2" />
            <span>ကင်မရာအသစ်ထည့်မည်</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cameras.map(async (camera) => {
            const latestPrice = await getLatestPrice(camera.id, 'camera');
            return (
              <Link key={camera.id} href={`/camera/${camera.id}`} className="block">
                <Card className="hover:border-primary/80 transition-colors h-full">
                  <CardHeader>
                    <img src={camera.imageUrl || 'https://placehold.co/400x300/171717/ffffff?text=No+Image'} alt={camera.model} className="w-full h-40 object-cover rounded-t-lg bg-muted" />
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-grow">
                    <div>
                        <CardDescription>{camera.brand}</CardDescription>
                        <CardTitle className="text-xl mt-1">{camera.model}</CardTitle>
                    </div>
                    <p className="text-lg font-semibold text-primary mt-4">{latestPrice}</p>
                  </CardContent>
                </Card>
              </Link>
            )}
          )}
          {cameras.length === 0 && <p className="text-muted-foreground col-span-full">ခြေရာခံထားသော ကင်မရာများ မရှိသေးပါ။</p>}
        </div>
      </section>

      {/* Tracked Lenses Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">ခြေရာခံနေသော မှန်ဘီလူးများ</h2>
           <Button>
            <PlusCircle size={20} className="mr-2" />
            <span>မှန်ဘီလူးအသစ်ထည့်မည်</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lenses.map(async (lens) => {
            const latestPrice = await getLatestPrice(lens.id, 'lens');
            return (
                <Link key={lens.id} href={`/lens/${lens.id}`} className="block">
                    <Card className="hover:border-primary/80 transition-colors h-full">
                    <CardHeader>
                        <img src={lens.imageUrl || 'https://placehold.co/400x300/171717/ffffff?text=No+Image'} alt={lens.name} className="w-full h-40 object-cover rounded-t-lg bg-muted" />
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between flex-grow">
                        <div>
                            <CardDescription>{lens.brand}</CardDescription>
                            <CardTitle className="text-lg mt-1">{lens.name}</CardTitle>
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
           {lenses.length === 0 && <p className="text-muted-foreground col-span-full">ခြေရာခံထားသော မှန်ဘီလူးများ မရှိသေးပါ။</p>}
        </div>
      </section>
    </div>
  );
}

