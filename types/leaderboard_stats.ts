import { User } from "./user";

export interface Stats {
  user: User;
  total_reactions: number;
  number_of_articles: number;
}

export interface standings {
  user: User;
  score: number;
}

export interface PageView {
  total_read: number;
}
