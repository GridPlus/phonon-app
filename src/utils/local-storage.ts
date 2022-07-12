import { SessionNames } from "../types";

const createStorage = <T>(key: string) => {
  return {
    remove: () => window.localStorage.removeItem(key),
    get: (): T | undefined => {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : undefined;
    },
    set: (value: T) => window.localStorage.setItem(key, JSON.stringify(value)),
  };
};

export const sessionNamesLocalStorage =
  createStorage<SessionNames>("SESSION_NAMES");
