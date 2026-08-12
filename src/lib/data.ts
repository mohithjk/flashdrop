export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  isSoldOut: boolean;
  specs: string[];
}

export const mockProducts: Product[] = [
  {
    id: "drop-001",
    title: "NEON X-1 SNEAKER",
    price: 299,
    image: "https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&q=80&w=800",
    isSoldOut: false,
    specs: ["Carbon fiber sole", "Adaptive neon lacing", "Limited to 500 pairs"],
  },
  {
    id: "drop-002",
    title: "OBSIDIAN HOODIE",
    price: 149,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    isSoldOut: true,
    specs: ["Heavyweight 400gsm cotton", "Reflective back print", "Oversized fit"],
  },
  {
    id: "drop-003",
    title: "CYBER VISOR",
    price: 199,
    image: "https://images.unsplash.com/photo-1572590285493-27eb84f09d57?auto=format&fit=crop&q=80&w=800",
    isSoldOut: false,
    specs: ["UV400 polarization", "Titanium frame", "Holographic tint"],
  },
  {
    id: "drop-004",
    title: "VOID TACTICAL BAG",
    price: 249,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    isSoldOut: false,
    specs: ["Ballistic nylon", "Magnetic fidlock clasps", "Modular attachments"],
  }
];
