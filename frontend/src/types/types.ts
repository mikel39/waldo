interface Char {
  id: number;
  name: string;
  imageId: string;
  url: string;
}

export interface Data {
  id: number;
  name: string;
  url: string;
  chars: Char[];
}

export type Page = "home" | "game" | "ranking";

interface User {
  id: number;
  token: string;
  username: null | string;
}

export interface GameData {
  id: number;
  uuid: string;
  userId: number;
  start: string;
  end: null | string;
  imageId: number;
  foundIds: number[];
  user: User;
}
