// /lib/utils.ts
// Tailwind CSS class တွေကို ပေါင်းစပ်ဖို့နဲ့ ကိန်းဂဏန်းတွေကို မြန်မာ "သိန်း" format ပြောင်းဖို့အတွက် utility functions တွေပါ။

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * MMK currency ကို "သိန်း" format ပြောင်းပေးတဲ့ function
 * @param amount - The amount in MMK
 * @returns Formatted string (e.g., "၃၃ သိန်း", "၃၃.၅ သိန်း")
 */
export function formatToLakhs(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return "N/A";
  }
  
  if (amount < 100000) {
    return new Intl.NumberFormat('my-MM').format(amount) + " ကျပ်";
  }
  
  const lakhs = amount / 100000;
  // 소수점 한 자리까지 표시
  const formattedLakhs = Math.round(lakhs * 10) / 10;
  
  return `${new Intl.NumberFormat('my-MM').format(formattedLakhs)} သိန်း`;
}

/**
 * Lens ရဲ့ အချက်အလက်တွေပေါ်မူတည်ပြီး suggestion တွေပေးမယ့် function
 * @param focalLength - Lens focal length range
 * @param aperture - Lens aperture range
 * @returns Array of suggestion strings
 */
export function getLensSuggestions(focalLength: { min: number; max: number }, aperture: { min: number; max: number }): {title: string, description: string}[] {
    const suggestions: {title: string, description: string}[] = [];

    // Focal Length Suggestions
    if (focalLength.min <= 24) {
        suggestions.push({ title: "Wide-Angle View", description: "ရှုခင်းများ၊ ဗိသုကာလက်ရာများနှင့် အဖွဲ့လိုက်ပုံများ ရိုက်ကူးရန်အတွက် အလွန်ကောင်းမွန်သည်။ အခန်းကျဉ်းများတွင် ရိုက်ကူးရန်လည်း သင့်တော်သည်။" });
    }
    if (focalLength.min >= 35 && focalLength.max <= 85) {
        suggestions.push({ title: "Standard / Portrait", description: "လူပုံများ (Portraits)၊ လမ်းသွားလမ်းလာများ (Street Photography) နှင့် နေ့စဉ်သုံးအတွက် အသင့်တော်ဆုံးဖြစ်သည်။ လူမျက်စိမြင်ကွင်းနှင့် အနီးစပ်ဆုံးတူသည်။" });
    }
    if (focalLength.max >= 100) {
        suggestions.push({ title: "Telephoto Reach", description: "အားကစား၊ တောရိုင်းတိရစ္ဆာန်များနှင့် အဝေးရှိအရာများကို ရိုက်ကူးရန်အတွက် အထူးသင့်တော်သည်။ အရာဝတ္ထုကို နောက်ခံမှ ခွဲထုတ်ပြလိုသည့်အခါ အသုံးဝင်သည်။" });
    }
    if (focalLength.min < 35 && focalLength.max > 70) {
        suggestions.push({ title: "Versatile Zoom", description: "ခရီးသွားခြင်းနှင့် အခြေအနေအမျိုးမျိုးအတွက် အသင့်တော်ဆုံးဖြစ်သည်။ wide-angle မှ telephoto အထိ ပါဝင်သောကြောင့် မှန်ဘီလူးတစ်ခုတည်းဖြင့် အစုံသုံးနိုင်သည်။" });
    }

    // Aperture Suggestions
    if (aperture.min <= 1.8) {
        suggestions.push({ title: "Excellent Low Light & Bokeh", description: "Aperture အကျယ်สุด (f/1.8 သို့မဟုတ် ပိုနည်း) ကြောင့် အလင်းရောင်နည်းသောနေရာများတွင် ကောင်းစွာရိုက်ကူးနိုင်ပြီး နောက်ခံဝေဝါးမှု (Bokeh) အလွန်ကောင်းမွန်စွာ ရရှိနိုင်သည်။" });
    }
    if (aperture.min > 1.8 && aperture.min <= 2.8) {
        suggestions.push({ title: "Great for Professionals", description: "f/2.8 aperture သည် professional zoom lens အများစုတွင်တွေ့ရပြီး အလင်းရောင်အတော်အသင့်ရရှိကာ နောက်ခံဝေဝါးမှုကိုလည်း ကောင်းမွန်စွာ ဖန်တီးနိုင်သည်။" });
    }
    if (aperture.min > 2.8 && aperture.min <= 4) {
        suggestions.push({ title: "Good for General Use", description: "နေ့ခင်းဘက်နှင့် အလင်းရောင်ကောင်းစွာရသော အခြေအနေများအတွက် လုံလောက်သည်။ ပေါ့ပါးပြီး သွားလာရလွယ်ကူသော lens များတွင် တွေ့ရတတ်သည်။" });
    }
     if (aperture.min > 4) {
        suggestions.push({ title: "Daylight Specialist", description: "အလင်းရောင်ကောင်းကောင်း လိုအပ်သည်။ ရှုခင်းများကဲ့သို့ အရာအားလုံးကို ชัดเจนစေလိုသည့်အခါ အသုံးဝင်သည်။" });
    }

    return suggestions;
}