export type LoanProductId =
  | "student"
  | "car"
  | "house"
  | "business"
  | "custom";

export type LoanProduct = {
  id: LoanProductId;
  title: string;
  tagline: string;
  min: number; // INR
  max: number; // INR
  rateMin: number; // % p.a.
  rateMax: number; // % p.a.
  defaultTenure: number; // months
  purposes: string[];
};

export const LOAN_PRODUCTS: Record<LoanProductId, LoanProduct> = {
  student: {
    id: "student",
    title: "Student Loan",
    tagline: "Lowest rate in market",
    min: 50_000,
    max: 20_00_000,
    rateMin: 8.5,
    rateMax: 12.5,
    defaultTenure: 60,
    purposes: ["Tuition Fees", "Books & Supplies", "Hostel / Living", "Equipment", "Other"],
  },
  car: {
    id: "car",
    title: "Car Loan",
    tagline: "Drive home in 24 hours",
    min: 1_00_000,
    max: 25_00_000,
    rateMin: 9.5,
    rateMax: 13.0,
    defaultTenure: 60,
    purposes: ["New Car", "Used Car", "Refinance", "Other"],
  },
  house: {
    id: "house",
    title: "Home Loan",
    tagline: "Up to ₹2.5 Cr · long tenure",
    min: 5_00_000,
    max: 2_50_00_000,
    rateMin: 8.4,
    rateMax: 10.5,
    defaultTenure: 240,
    purposes: ["Home Purchase", "Plot Purchase", "Renovation", "Balance Transfer"],
  },
  business: {
    id: "business",
    title: "Business Loan",
    tagline: "Grow your business fast",
    min: 1_00_000,
    max: 50_00_000,
    rateMin: 14.0,
    rateMax: 22.0,
    defaultTenure: 36,
    purposes: ["Working Capital", "Expansion", "Equipment", "Inventory", "Other"],
  },
  custom: {
    id: "custom",
    title: "Personal Loan",
    tagline: "For anything you need",
    min: 25_000,
    max: 10_00_000,
    rateMin: 11.5,
    rateMax: 24.0,
    defaultTenure: 24,
    purposes: ["Personal", "Medical", "Travel", "Wedding", "Other"],
  },
};

export function formatRateRange(p: LoanProduct): string {
  return `${p.rateMin}% – ${p.rateMax}% p.a.`;
}

export function getLoanProduct(id: string): LoanProduct | null {
  return (LOAN_PRODUCTS as Record<string, LoanProduct>)[id] ?? null;
}

// Format using Indian numbering: ₹1,23,456
export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

// Compact: ₹10K, ₹5L, ₹1Cr
export function formatINRCompact(n: number): string {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(n % 1_00_00_000 === 0 ? 0 : 1)} Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(n % 1_00_000 === 0 ? 0 : 1)} L`;
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)} K`;
  return `₹${n}`;
}

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export const INDIAN_BANKS = [
  "HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank",
  "IndusInd Bank", "Yes Bank", "Punjab National Bank", "Bank of Baroda", "Canara Bank",
  "Union Bank of India", "IDFC FIRST Bank", "Federal Bank", "RBL Bank", "Other",
];
