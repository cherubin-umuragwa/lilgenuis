import type { StudentProfile } from "@/types";
import { StorageService } from "@/lib/storage";
import { STORAGE_KEYS } from "@/config/constants";

export class ProfileRepository {
  static getProfile(): StudentProfile | null {
    return StorageService.get<StudentProfile>(STORAGE_KEYS.PROFILE);
  }

  static saveProfile(profile: StudentProfile): void {
    StorageService.set<StudentProfile>(STORAGE_KEYS.PROFILE, profile);
  }

  static updateProfile(partial: Partial<StudentProfile>): void {
    const existing = ProfileRepository.getProfile();
    if (!existing) return;
    ProfileRepository.saveProfile({ ...existing, ...partial });
  }

  static deleteProfile(): void {
    StorageService.remove(STORAGE_KEYS.PROFILE);
  }

  static hasProfile(): boolean {
    return ProfileRepository.getProfile() !== null;
  }
}
