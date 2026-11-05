import type { CharacterType } from "@/types";

export interface CharacterOption {
  id: CharacterType;
  name: string;
  nameEn: string;
  nameFr: string;
  description: string;
  unlockCondition: string; // human-readable
  xpRequired: number; // 0 = available from start
}

export const CHARACTER_OPTIONS: CharacterOption[] = [
  {
    id: "explorer",
    name: "Explorer",
    nameEn: "Explorer",
    nameFr: "Explorateur",
    description: "A brave adventurer ready to discover new worlds",
    unlockCondition: "Available from the start",
    xpRequired: 0,
  },
  {
    id: "scientist",
    name: "Scientist",
    nameEn: "Scientist",
    nameFr: "Scientifique",
    description: "A curious mind who loves experiments",
    unlockCondition: "Earn 100 XP",
    xpRequired: 100,
  },
  {
    id: "artist",
    name: "Artist",
    nameEn: "Artist",
    nameFr: "Artiste",
    description: "A creative soul who expresses ideas beautifully",
    unlockCondition: "Earn 300 XP",
    xpRequired: 300,
  },
];

/** Returns only the characters the student has unlocked based on their total XP. */
export function getUnlockedCharacters(totalXP: number): CharacterOption[] {
  return CHARACTER_OPTIONS.filter((c) => totalXP >= c.xpRequired);
}
