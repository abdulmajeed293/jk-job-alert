export interface Job {
  id: number;
  title: string;
  company: string;
  slug: string;
  department?: string;
  type: "Government" | "Private";
  applyMode?: string;
  location?: string;
  totalPosts?: number;
  notification?: string;
  startDate?: string;
  lastDate?: string;
  admitCard?: string;
  examDate?: string;
  qualification?: string;
  ageLimit?: string;
  ageRelaxation?: string;
  fee?: string;
  selection?: string;
  salary?: string;
  
  syllabus?: string;
  pattern?: string;
  totalMarks: string;
  applyLink?: string;
  notificationLink?: string;
  officialLink?: string;
  status?: "active" | "expired";

  om: string;
  obc: string;
  sc: string;
  st1: string;
  st2: string;
  alc: string;
  rba: string;
  ews: string;
  other: string;

  /* ================== Age limit ================== */
  omal: string;
  scal: string;
  st1al: string;
  st2al: string;
  rbaal: string;
  alcibal: string;
  ewsal: string; 
  obcal: string; 
  pcpal: string;
  otheral: string;



  // optional fallback for extra fields from backend
}
