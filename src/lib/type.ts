
export type Job = {
  id: number;
  title: string;
  badgeLetter: string;
  company: string;
  relevanveScore: number;
  daysAgo: number;
};

export type JobItemType = {
  id: number;
  description: string;
  qualifications: string[];
  reviews: string[];
  title: string;
  badgeLetters: string;
  company: string;
  duration: string;
  salary: string;
  location: string;
  relevanceScore: number;
  daysAgo: number;
  coverImgURL: string;
  companyURL: string;
};