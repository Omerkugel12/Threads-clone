import { atom } from "recoil";

interface loadingStateType {
  getPosts: boolean;
}

const loadingDeafult = {
  getPosts: false,
};

export const loadingPostsState = atom<loadingStateType>({
  key: "loadingState",
  default: loadingDeafult,
});
