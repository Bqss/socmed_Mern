import { ResultType } from "@remix-run/router/dist/utils";

interface User {
  _id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  profilePicture?: string;
  coverPicture?: string;
  about?: string;
  livesIn?: string;
  workAt?: string;
  relationship?: "married" | "single" | undefined;
  following: Array<string>;
  followers: Array<string>;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResult<T> {
  data: T[];
  nextId: number;
  prevId: number;
}

interface NewPost {
  media?: File,
  desc: string
}

interface Post {
  media : string,
  creator : string,
  desc: string,
  createdAt: string,
  updatedAt: string,
  likes: Array<String>
}

//  type Followers = Array<User>
//  type Following = Array<User
