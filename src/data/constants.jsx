// ─── ZONES ──────────────────────────────────────────────────────────────────
export const ZONES = [
  'Sector 12', 'Lal Dora', 'Civil Lines',
  'Model Town', 'Old City', 'Sadar Bazar',
];

export const ZONE_META = {
  'Sector 12': {count: 340, color: '#1e2a1a' },
  'Lal Dora':  { count: 210, color: '#1a1e2a' },
  'Civil Lines':{count: 520, color: '#2a1a1e' },
  'Model Town': {count: 280, color: '#1a2a22' },
  'Old City':   {count: 460, color: '#2a221a' },
  'Sadar Bazar':{count: 390, color: '#221a2a' },
};

// ─── AVATAR ──────────────────────────────────────────────────────────────────
export const AVATAR_COLORS = [
  '#e8581a', '#1a9e6e', '#185fa5', '#c4507e',
  '#ba7510', '#6a44c7', '#d44040', '#2e7d52',
];

const ADJ = ['Swift','Quiet','Bold','Bright','Calm','Keen','Deep','Fine','Sharp','Cool'];
const NON = ['Panda','Finch','Maple','Stone','Creek','Dusk','Helm','Croft','Wolf','Hawk'];
export const generateName = () =>
  `${ADJ[Math.floor(Math.random() * ADJ.length)]}${NON[Math.floor(Math.random() * NON.length)]}`;

// ─── SHOPS ───────────────────────────────────────────────────────────────────
export const SHOPS = [
  {
    id: 1, icon: '🛒', name: 'Sharma General Store', type: 'Grocery',
    trust: 'Trusted', rating: 4.7, reviews: 83,
    prices: ['Rice ₹44/kg', 'Dal ₹95/kg', 'Oil ₹145/L', 'Atta ₹38/kg'],
    desc: 'Reliable weights, never overcharges. Go-to for daily staples. Sharma uncle gives regulars a small discount.',
    since: '12 yrs', open: '7am – 10pm',
  },
  {
    id: 2, icon: '⚡', name: 'Brijesh Electronics', type: 'Electronics',
    trust: 'Fair', rating: 3.9, reviews: 41,
    prices: ['Repair ₹200 flat', 'Wiring ₹50/m', 'Fan service ₹120'],
    desc: 'Charges slightly above MRP on parts but does quality work. Always ask for a written estimate first.',
    since: '3 yrs', open: '10am – 8pm',
  },
  {
    id: 3, icon: '🥬', name: 'Mohan Fruits & Veggies', type: 'Produce',
    trust: 'Trusted', rating: 4.8, reviews: 116,
    prices: ['Tomato ₹30/kg', 'Onion ₹25/kg', 'Banana ₹6/pc', 'Spinach ₹20/bunch'],
    desc: 'Freshest produce in the zone. Arrives daily at 7am. Mohan has been at this corner for over a decade.',
    since: '14 yrs', open: '7am – 7pm',
  },
  {
    id: 4, icon: '💊', name: 'City Pharmacy', type: 'Medicine',
    trust: 'Trusted', rating: 4.5, reviews: 62,
    prices: ['Generic available', 'Delivery ₹20', 'BP check free'],
    desc: 'Stocks generics and rare medicines. Polite staff. Open till 10pm. Dr. Verma next door for prescriptions.',
    since: '8 yrs', open: '9am – 10pm',
  },
  {
    id: 5, icon: '📱', name: 'Raja Mobile Shop', type: 'Mobile',
    trust: 'Costly', rating: 3.1, reviews: 29,
    prices: ['Screen ₹800+', 'Charging port ₹400', 'Battery ₹350'],
    desc: 'Significantly overcharges on repairs. Always demand an itemised bill. Local market rates are ~30% lower.',
    since: '2 yrs', open: '11am – 9pm',
  },
  {
    id: 6, icon: '🍽️', name: 'Annapurna Dhaba', type: 'Food',
    trust: 'Fair', rating: 4.1, reviews: 55,
    prices: ['Thali ₹80', 'Chai ₹12', 'Paratha ₹20', 'Dal Tadka ₹60'],
    desc: 'Great weekday thali. Inconsistent on weekends when staff is thin. Avoid the paneer — locals say it\'s not fresh.',
    since: '5 yrs', open: '7am – 11pm',
  },
  {
    id: 7, icon: '✂️', name: 'Raju Hair Salon', type: 'Salon',
    trust: 'Trusted', rating: 4.4, reviews: 38,
    prices: ['Haircut ₹80', 'Shave ₹40', 'Facial ₹150'],
    desc: 'Clean, affordable, no appointment needed. Raju has a steady hand and doesn\'t push unnecessary products.',
    since: '6 yrs', open: '8am – 8pm',
  },
  {
    id: 8, icon: '📚', name: 'Soni Stationery', type: 'Stationery',
    trust: 'Trusted', rating: 4.3, reviews: 47,
    prices: ['Photocopy ₹1/page', 'Print ₹5/page', 'Spiral binding ₹30'],
    desc: 'Best photocopy rates in zone. Stocks all school and office supplies. Auntie is very helpful.',
    since: '9 yrs', open: '8am – 9pm',
  },
];

// ─── FARES ───────────────────────────────────────────────────────────────────
export const FARES = [
  { id: 1, from: 'Bus Stand',     to: 'Civil Hospital',   mode: 'Auto',       price: 40,  upvotes: 34, downvotes: 3 },
  { id: 2, from: 'Market',        to: 'Railway Station',  mode: 'Auto',       price: 60,  upvotes: 28, downvotes: 5 },
  { id: 3, from: 'Sector 12 Gate',to: 'Old City',         mode: 'E-Rickshaw', price: 20,  upvotes: 51, downvotes: 2 },
  { id: 4, from: 'School Road',   to: 'DTC Depot',        mode: 'Auto',       price: 35,  upvotes: 19, downvotes: 8 },
  { id: 5, from: 'Police Chowki', to: 'Mall Road',        mode: 'Rickshaw',   price: 25,  upvotes: 22, downvotes: 1 },
  { id: 6, from: 'Park Gate',     to: 'Metro Station',    mode: 'E-Rickshaw', price: 15,  upvotes: 44, downvotes: 2 },
];

// ─── MESSAGES ────────────────────────────────────────────────────────────────
export const INITIAL_MESSAGES = [
  { id: 1, author: 'SwiftPanda',  color: '#e8581a', type: 'alert',    text: 'Water supply off tomorrow 10am–2pm. Fill up tanks tonight!',                  time: '2m ago' },
  { id: 2, author: 'QuietFinch',  color: '#1a9e6e', type: 'tip',      text: 'Sharma store got fresh paneer today — very limited, go early.',                time: '8m ago' },
  { id: 3, author: 'BoldMaple',   color: '#185fa5', type: 'question', text: 'Is the Sector 12 gate road still blocked? Need to reach bus stand.',           time: '15m ago' },
  { id: 4, author: 'CalmStone',   color: '#ba7510', type: 'info',     text: 'New vegetable vendor set up at Park Gate corner. Prices 20% cheaper.',         time: '31m ago' },
  { id: 5, author: 'KeenCreek',   color: '#c4507e', type: 'alert',    text: 'Stray dogs near lane 7 after dark. Carry a stick or stick to main road.',      time: '1h ago' },
  { id: 6, author: 'DeepWolf',    color: '#6a44c7', type: 'tip',      text: 'Soni stationery is doing photocopy at ₹0.80/page today only — student offer.', time: '2h ago' },
  { id: 7, author: 'FineHawk',    color: '#2e7d52', type: 'info',     text: 'New bus route 322 now stops at Sector 12. Saves 20 min to railway station.',   time: '3h ago' },
];

// ─── MAP PINS ────────────────────────────────────────────────────────────────
export const MAP_PINS = [
  { id: 1, x: 28, y: 38, icon: '🛒', label: 'Sharma Store',   type: 'shop' },
  { id: 2, x: 54, y: 56, icon: '🏥', label: 'City Clinic',     type: 'health' },
  { id: 3, x: 70, y: 27, icon: '⚡', label: 'Brijesh Elec',    type: 'shop' },
  { id: 4, x: 20, y: 67, icon: '🥬', label: 'Mohan Veggies',   type: 'shop' },
  { id: 5, x: 80, y: 65, icon: '🍽️', label: 'Dhaba',           type: 'food' },
  { id: 6, x: 46, y: 17, icon: '🚌', label: 'Bus Stand',        type: 'transport' },
  { id: 7, x: 62, y: 42, icon: '💊', label: 'City Pharmacy',    type: 'health' },
  { id: 8, x: 35, y: 75, icon: '✂️', label: 'Raju Salon',       type: 'shop' },
];

// ─── VALIDATION ──────────────────────────────────────────────────────────────
export const validate = {
  fare: (v) => {
    const n = parseFloat(v);
    if (!v?.trim()) return 'Amount is required';
    if (isNaN(n))   return 'Enter a valid number';
    if (n < 1 || n > 999) return 'Amount must be ₹1 – ₹999';
    return null;
  },
  chat: (v) => {
    if (!v?.trim())       return 'Message cannot be empty';
    if (v.trim().length < 3) return 'Too short — say a bit more';
    if (v.length > 240)   return 'Max 240 characters';
    return null;
  },
  name: (v) => {
    if (!v?.trim())          return 'Name is required';
    if (v.trim().length < 2) return 'At least 2 characters';
    if (v.length > 24)       return 'Max 24 characters';
    if (/[^a-zA-Z0-9\s]/.test(v)) return 'Letters and numbers only';
    return null;
  },
  fareRoute: (v) => {
    if (!v?.trim())       return 'This field is required';
    if (v.trim().length < 2) return 'At least 2 characters';
    return null;
  },
};
