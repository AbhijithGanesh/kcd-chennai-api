import { User } from "./user";

export interface Article {
  type_of: string;
  id: Number;
  user: User;
  comments_count: Number;
  reaction_count: Number;
}
