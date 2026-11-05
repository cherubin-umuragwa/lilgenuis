import type { GameState } from "@/types";
import { StorageService } from "@/lib/storage";
import { STORAGE_KEYS } from "@/config/constants";

export class GameStateRepository {
  static getGameState(): GameState | null {
    return StorageService.get<GameState>(STORAGE_KEYS.GAME_STATE);
  }

  static saveGameState(state: GameState): void {
    StorageService.set<GameState>(STORAGE_KEYS.GAME_STATE, state);
  }

  static clearGameState(): void {
    StorageService.remove(STORAGE_KEYS.GAME_STATE);
  }
}
