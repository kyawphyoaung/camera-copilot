// /app/lens/[id]/add-price/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addLensPriceEntry(lensId: string, formData: FormData) {
  // Form data တွေကို သက်ဆိုင်ရာ data type တွေအဖြစ် ပြောင်းလဲခြင်း
  const shopName = formData.get("shopName") as string;
  const price = parseFloat(formData.get("price") as string);
  const date = new Date(formData.get("date") as string);
  const isSecondHand = !!formData.get("isSecondHand");
  const shutterCountRaw = formData.get("shutterCount") as string;
  const conditionRaw = formData.get("condition") as string;
  const notes = formData.get("notes") as string | null;

  // validation
  if (!shopName || !price || !date || !lensId) {
    throw new Error("Required fields are missing.");
  }

  // Database ထဲသို့ data ထည့်သွင်းခြင်း (lensId ဖြင့်)
  await prisma.priceEntry.create({
    data: {
      shopName,
      price,
      date,
      isSecondHand,
      shutterCount: isSecondHand && shutterCountRaw ? parseInt(shutterCountRaw) : null,
      condition: isSecondHand && conditionRaw ? parseInt(conditionRaw) : null,
      notes: notes || null,
      lensId: lensId, // ဒီနေရာမှာ cameraId အစား lensId ကို အသုံးပြုပါတယ်
    },
  });

  // Data အသစ်ထည့်ပြီးကြောင်း cache ကို update လုပ်ခြင်း
  revalidatePath(`/lens/${lensId}`);
  
  // Lens detail page သို့ ပြန်လည်လမ်းညွှန်ခြင်း
  redirect(`/lens/${lensId}`);
}