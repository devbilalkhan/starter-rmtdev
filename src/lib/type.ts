export type Job = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobItemType = Job & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};

export type TSortBy = "relevance" | "recent";
export type TPageDirection = "previous" | "next";


export type BookmarkContentDefaultType = {
  bookmarkedIds: number[];
  handleToggleBookmarkBtn: (id: number) => void;
  bookmarkedJobItems: JobItemType[];
  isLoading: boolean;
};

export type BookmarksContextProps = {
  children: React.ReactNode;
};
