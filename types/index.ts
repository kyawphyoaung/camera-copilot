// /types/index.ts
// ကင်မရာ၊ မှန်ဘီလူးနဲ့ စျေးနှုန်းတွေအတွက် TypeScript Types တွေ သတ်မှတ်ထားပါတယ်။

export interface PriceEntry {
  id: string;
  shopName: string;
  price: number; // MMK
  date: string; // ISO 8601 format: "YYYY-MM-DD"
  isSecondHand: boolean;
  shutterCount?: number;
  condition?: number; // 0 to 100, for slider
}

export interface Camera {
  id: string;
  model: string;
  brand: string;
  imageUrl: string;
  priceEntries: PriceEntry[];
  referencePriceUSD?: number; // B&H, Adorama စျေးနှုန်း (USD)
}

export interface Lens {
  id:string;
  name: string;
  brand: string;
  imageUrl: string;
  focalLength: {
    min: number;
    max: number;
  };
  aperture: {
    min: number;
    max: number;
  };
  mountType: 'E' | 'FE' | 'EF' | 'RF' | 'Z';
  type: 'DC' | 'DN' | 'Art' | 'G' | 'GM';
  priceEntries: PriceEntry[];
  referencePriceUSD?: number; // USD စျေးနှုန်း
}
