import { ApplyData } from "./applyStore";

const FIRST_NAMES = ["Aarav", "Vihaan", "Arjun", "Sai", "Reyansh", "Ananya", "Diya", "Saanvi", "Aadhya", "Ishaan"];
const LAST_NAMES = ["Sharma", "Verma", "Mehta", "Patel", "Iyer", "Reddy", "Singh", "Gupta", "Kumar", "Joshi"];
const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];
const STATES_BY_CITY: Record<string, string> = {
  Mumbai: "Maharashtra",
  Pune: "Maharashtra",
  Delhi: "Delhi",
  Bengaluru: "Karnataka",
  Hyderabad: "Telangana",
  Chennai: "Tamil Nadu",
  Kolkata: "West Bengal",
  Ahmedabad: "Gujarat",
};
const EMPLOYERS = ["Infosys Ltd.", "Tata Consultancy Services", "Wipro Ltd.", "HCL Technologies", "Tech Mahindra"];
const DESIGNATIONS = ["Software Engineer", "Senior Engineer", "Product Manager", "Business Analyst", "Team Lead"];
const BANKS = ["HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "State Bank of India"];
const IFSC_BY_BANK: Record<string, string> = {
  "HDFC Bank": "HDFC0001234",
  "ICICI Bank": "ICIC0001234",
  "Axis Bank": "UTIB0001234",
  "Kotak Mahindra Bank": "KKBK0001234",
  "State Bank of India": "SBIN0001234",
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPAN(): string {
  // 5 letters + 4 digits + 1 letter
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const r = (n: number, src: string) =>
    Array.from({ length: n }, () => src[Math.floor(Math.random() * src.length)]).join("");
  return r(5, letters) + r(4, "0123456789") + r(1, letters);
}

function randomMobile(): string {
  const first = pick(["6", "7", "8", "9"]);
  let rest = "";
  for (let i = 0; i < 9; i++) rest += Math.floor(Math.random() * 10);
  return first + rest;
}

function randomPIN(): string {
  const codes = ["400001", "110001", "560001", "500001", "600001", "411001", "700001", "380001"];
  return pick(codes);
}

function randomAccount(): string {
  let acc = "";
  for (let i = 0; i < 12; i++) acc += Math.floor(Math.random() * 10);
  return acc;
}

function randomDOB(): string {
  // 25–45 yrs old
  const year = 2026 - 25 - Math.floor(Math.random() * 20);
  const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
  const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function generateDemoData(): Partial<ApplyData> {
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  const fullName = `${firstName} ${lastName}`;
  const city = pick(CITIES);
  const bank = pick(BANKS);
  const employer = pick(EMPLOYERS);

  const ref1First = pick(FIRST_NAMES);
  const ref1Last = pick(LAST_NAMES);
  const ref2First = pick(FIRST_NAMES);
  const ref2Last = pick(LAST_NAMES);

  return {
    // Personal
    fullName,
    dob: randomDOB(),
    gender: pick(["Male", "Female"]),
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
    phone: randomMobile(),
    idNumber: randomPAN(),
    aadhaarLast4: String(Math.floor(1000 + Math.random() * 9000)),
    address: `${Math.floor(1 + Math.random() * 200)}, ${pick(["MG Road", "Park Street", "Linking Road", "Brigade Road"])}`,
    city,
    state: STATES_BY_CITY[city],
    postalCode: randomPIN(),

    // Employment
    employmentStatus: "Salaried",
    employer,
    designation: pick(DESIGNATIONS),
    workEmail: `${firstName.toLowerCase()}@${employer.toLowerCase().split(" ")[0]}.com`,
    yearsEmployed: pick(["1–3 years", "3–5 years", "5–10 years"]),

    // Financial
    monthlyIncome: String(50000 + Math.floor(Math.random() * 150000)),
    otherIncome: "0",
    existingEmi: String(Math.floor(Math.random() * 20000)),
    monthlyExpenses: String(20000 + Math.floor(Math.random() * 30000)),

    // Banking
    bankName: bank,
    accountNumber: randomAccount(),
    routingNumber: IFSC_BY_BANK[bank],
    salaryAccount: true,

    // References
    ref1Name: `${ref1First} ${ref1Last}`,
    ref1Phone: randomMobile(),
    ref2Name: `${ref2First} ${ref2Last}`,
    ref2Phone: randomMobile(),

    // Consents
    consentBureau: true,
    consentTerms: true,
  };
}
