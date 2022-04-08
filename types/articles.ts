import { User } from "./user";

export interface Article {
  type_of: string;
  id: number;
  user: User;
  comments_count: number;
  public_reactions_count: number;
  published_at: Date;
}
