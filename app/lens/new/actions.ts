// /app/lens/new/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLens(formData: FormData) {
  // Form data တွေကို ထုတ်ယူခြင်း
  const brand = formData.get("brand") as string;
  const name = formData.get("name") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const focalLengthMin = parseInt(formData.get("focalLengthMin") as string);
  const focalLengthMax = parseInt(formData.get("focalLengthMax") as string);
  const apertureMin = parseFloat(formData.get("apertureMin") as string);
  const apertureMax = parseFloat(formData.get("apertureMax") as string);
  const mountType = formData.get("mountType") as string;
  const lensType = formData.get("lensType") as string;

  // Validation
  if (!brand || !name || !focalLengthMin || !focalLengthMax || !apertureMin || !apertureMax || !mountType || !lensType) {
    throw new Error("Required fields are missing.");
  }

  // Database ထဲသို့ data ထည့်သွင်းခြင်း
  await prisma.lens.create({
    data: {
      brand,
      name,
      imageUrl: imageUrl || undefined,
      focalLengthMin,
      focalLengthMax,
      apertureMin,
      apertureMax,
      mountType,
      lensType,
    },
  });

  // Home page cache ကို update လုပ်ခြင်း
  revalidatePath("/");
  // Home page သို့ ပြန်သွားခြင်း
  redirect("/");
}