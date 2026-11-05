export class StorageService {
  private static isAvailable(): boolean {
    return typeof window !== "undefined";
  }

  static get<T>(key: string): T | null {
    if (!StorageService.isAvailable()) return null;
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  static set<T>(key: string, value: T): void {
    if (!StorageService.isAvailable()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be full or unavailable — fail silently
    }
  }

  static remove(key: string): void {
    if (!StorageService.isAvailable()) return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Fail silently
    }
  }

  static clear(): void {
    if (!StorageService.isAvailable()) return;
    try {
      window.localStorage.clear();
    } catch {
      // Fail silently
    }
  }
}
