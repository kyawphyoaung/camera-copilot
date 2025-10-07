// /app/camera/new/page.tsx
"use client";

import { createCamera } from "./actions";
import { Button } from "@/components/ui/button";

export default function NewCameraPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6">ကင်မရာအသစ် ထည့်သွင်းရန်</h1>
      <form action={createCamera} className="space-y-6">
        <div>
          <label htmlFor="brand" className="block text-lg font-medium mb-2">တံဆိပ် (Brand)</label>
          <input
            type="text"
            id="brand"
            name="brand"
            required
            placeholder="ဥပမာ။ Sony, Canon"
            className="w-full px-4 py-2 border bg-input rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="model" className="block text-lg font-medium mb-2">မော်ဒယ် (Model)</label>
          <input
            type="text"
            id="model"
            name="model"
            required
            placeholder="ဥပမာ။ a6400, ZV-E10"
            className="w-full px-4 py-2 border bg-input rounded-lg"
          />
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
         <div>
          <label htmlFor="referencePriceUSD" className="block text-lg font-medium mb-2">နိုင်ငံတကာ ပေါက်စျေး (USD) (Optional)</label>
          <input
            type="number"
            id="referencePriceUSD"
            name="referencePriceUSD"
            step="0.01"
            placeholder="ဥပမာ။ 899"
            className="w-full px-4 py-2 border bg-input rounded-lg"
          />
        </div>
        <Button type="submit" className="w-full py-3">
          ကင်မရာ သိမ်းဆည်းမည်
        </Button>
      </form>
    </div>
  );
}