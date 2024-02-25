import { atom } from "jotai";
export const nicheAtom = atom<{ id: number } | undefined>(undefined);
export const filterAtom = atom<{
  timeline?: { date: Date; id: number; text: string };
  status?: { id: number; text: string; value: { min: number; max: number } };
}>({
  timeline: {
    date: new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000),
    id: 2,
    text: "1 Year",
  },
  status: {
    id: 0,
    text: "All",
    value: { min: 0, max: 100 },
  },
});
