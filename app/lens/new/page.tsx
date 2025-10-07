// /app/lens/new/page.tsx
"use client";

import { createLens } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewLensPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <Link href="/" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={18} />
          <span>နောက်သို့</span>
      </Link>
      <h1 className="text-3xl font-bold mb-6">မှန်ဘီလူးအသစ် ထည့်သွင်းရန်</h1>
      <form action={createLens} className="space-y-6">
        <div>
          <label htmlFor="brand" className="block text-lg font-medium mb-2">တံဆိပ် (Brand)</label>
          <input
            type="text"
            id="brand"
            name="brand"
            required
            placeholder="ဥပမာ။ Sigma, Sony"
            className="w-full px-4 py-2 border bg-input rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-2">မှန်ဘီလူး အမည် (Name)</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="ဥပမာ။ 18-50mm F2.8 DC DN"
            className="w-full px-4 py-2 border bg-input rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="focalLengthMin" className="block font-medium mb-2">Focal Length (Min)</label>
                <input type="number" id="focalLengthMin" name="focalLengthMin" required placeholder="18" className="w-full px-4 py-2 border bg-input rounded-lg" />
            </div>
            <div>
                <label htmlFor="focalLengthMax" className="block font-medium mb-2">Focal Length (Max)</label>
                <input type="number" id="focalLengthMax" name="focalLengthMax" required placeholder="50" className="w-full px-4 py-2 border bg-input rounded-lg" />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="apertureMin" className="block font-medium mb-2">Aperture (Min)</label>
                <input type="number" step="0.1" id="apertureMin" name="apertureMin" required placeholder="2.8" className="w-full px-4 py-2 border bg-input rounded-lg" />
            </div>
            <div>
                <label htmlFor="apertureMax" className="block font-medium mb-2">Aperture (Max)</label>
                <input type="number" step="0.1" id="apertureMax" name="apertureMax" required placeholder="22" className="w-full px-4 py-2 border bg-input rounded-lg" />
            </div>
        </div>
         <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="mountType" className="block font-medium mb-2">Mount Type</label>
                <input type="text" id="mountType" name="mountType" required placeholder="E.g., E, FE, EF" className="w-full px-4 py-2 border bg-input rounded-lg" />
            </div>
            <div>
                <label htmlFor="lensType" className="block font-medium mb-2">Lens Type</label>
                <input type="text" id="lensType" name="lensType" required placeholder="E.g., DC DN, GM" className="w-full px-4 py-2 border bg-input rounded-lg" />
            </div>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-lg font-medium mb-2">Image URL (Optional)</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            placeholder="https://..."
            className="w-full px-4 py-2 border bg-input rounded-lg"
          />
        </div>
        <Button type="submit" className="w-full py-3">
          မှန်ဘီလူး သိမ်းဆည်းမည်
        </Button>
      </form>
    </div>
  );
}