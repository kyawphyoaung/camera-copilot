// /app/camera/new/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCamera(formData: FormData) {
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const imageUrl = formData.get("imageUrl") as string | null;
  const referencePriceUSDRaw = formData.get("referencePriceUSD") as string | null;
  
  const referencePriceUSD = referencePriceUSDRaw ? parseFloat(referencePriceUSDRaw) : null;

  if (!brand || !model) {
    throw new Error("Brand and model are required.");
  }

  await prisma.camera.create({
    data: {
      brand,
      model,
      imageUrl: imageUrl || undefined,
      referencePriceUSD: referencePriceUSD || undefined,
    },
  });

  // Revalidate the home page to show the new camera
  revalidatePath("/");
  // Redirect back to the home page
  redirect("/");
}