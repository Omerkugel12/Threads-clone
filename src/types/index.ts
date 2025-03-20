export interface UserData {
  _id: string;
  id: string;
  objectId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
}

export interface Thread {
  _id: string;
  text: string;
  author: UserData;
  community: string;
  createdAt: Date;
  parentId: string | null;
  children: {
    author: UserData;
    text: string;
    createdAt: Date;
    _id: string;
    parentId: string | null;
    children: {
      author: UserData;
      text: string;
      createdAt: Date;
      _id: string;
      parentId: string | null;
    }[];
  }[];
}
