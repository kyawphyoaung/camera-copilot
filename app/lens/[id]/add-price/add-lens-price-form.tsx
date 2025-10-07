// /app/lens/[id]/add-price/add-lens-price-form.tsx
"use client";

import { useState, use } from "react";
import { addLensPriceEntry } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AddLensPriceFormProps {
  paramsPromise: Promise<{ id: string }>;
  shopNames: string[];
}

export default function AddLensPriceForm({ paramsPromise, shopNames }: AddLensPriceFormProps) {
  const params = use(paramsPromise);

  const [isSecondHand, setIsSecondHand] = useState(false);
  const [condition, setCondition] = useState(90);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
       <Link href={`/lens/${params.id}`} className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft size={18} />
          <span>နောက်သို့</span>
      </Link>

      <h1 className="text-3xl font-bold mb-6">Lens စျေးနှုန်းအသစ် ထည့်သွင်းရန်</h1>
      
      <form 
        action={async (formData) => {
          await addLensPriceEntry(params.id, formData);
        }} 
        className="space-y-6"
      >
        {/* Shop Name Combobox */}
        <div>
          <label htmlFor="shopName" className="block text-lg font-medium mb-2">ဆိုင်နာမည်</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            required
            placeholder="ရှိပြီးသား ဆိုင်ကို ရွေးပါ သို့မဟုတ် အသစ်ရိုက်ထည့်ပါ"
            className="w-full px-4 py-2 border bg-input rounded-lg"
            list="shop-names"
          />
          <datalist id="shop-names">
            {shopNames.map(name => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-lg font-medium mb-2">စျေးနှုန်း (ကျပ်)</label>
          <input
            type="number"
            id="price"
            name="price"
            required
            placeholder="ဥပမာ။ 1550000"
            className="w-full px-4 py-2 border bg-input rounded-lg"
          />
        </div>
        
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-lg font-medium mb-2">နေ့စွဲ</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            defaultValue={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border bg-input rounded-lg"
          />
        </div>

        {/* Second Hand Checkbox */}
        <div className="flex items-center gap-3">
            <input 
                type="checkbox"
                id="isSecondHand"
                name="isSecondHand"
                checked={isSecondHand}
                onChange={(e) => setIsSecondHand(e.target.checked)}
                className="h-5 w-5 rounded bg-input border-border text-primary focus:ring-primary"
            />
            <label htmlFor="isSecondHand" className="text-lg font-medium">Second Hand (တစ်ပတ်ရစ်)</label>
        </div>

        {isSecondHand && (
            <div className="space-y-6 p-4 border border-border rounded-lg bg-secondary/50">
                <div>
                    <label htmlFor="shutterCount" className="block font-medium mb-2">Shutter Count</label>
                    <input
                        type="number"
                        id="shutterCount"
                        name="shutterCount"
                        placeholder="ဥပမာ။ 5500"
                        className="w-full px-4 py-2 border bg-input rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="condition" className="block font-medium mb-2">
                        Body Condition: <span className="font-bold text-primary">{condition}%</span>
                    </label>
                    <input
                        type="range"
                        id="condition"
                        name="condition"
                        min="0"
                        max="100"
                        value={condition}
                        onChange={(e) => setCondition(Number(e.target.value))}
                        className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        )}

        {/* Notes */}
        <div>
            <label htmlFor="notes" className="block text-lg font-medium mb-2">မှတ်စု (Optional)</label>
            <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="ဥပမာ။ မှို၊ ခြစ်ရာ မရှိ"
                className="w-full px-4 py-2 border bg-input rounded-lg"
            />
        </div>

        <Button type="submit" className="w-full py-3">
          စျေးနှုန်း သိမ်းဆည်းမည်
        </Button>
      </form>
    </div>
  );
}