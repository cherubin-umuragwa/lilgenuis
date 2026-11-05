"use client";

import { useState, useCallback } from "react";
import type { StudentProfile } from "@/types";
import { ProfileRepository } from "@/lib/repositories/profile.repository";

interface UseProfileReturn {
  profile: StudentProfile | null;
  saveProfile: (profile: StudentProfile) => void;
  updateProfile: (partial: Partial<StudentProfile>) => void;
  hasProfile: boolean;
  isLoading: boolean;
}

/** Read profile from localStorage. Returns null on server or when not set. */
function readProfile(): StudentProfile | null {
  if (typeof window === "undefined") return null;
  return ProfileRepository.getProfile();
}

export function useProfile(): UseProfileReturn {
  // Lazy initializer runs once on client — safe, no useEffect setState
  const [profile, setProfile] = useState<StudentProfile | null>(readProfile);
  const [isLoading] = useState(false);

  const saveProfile = useCallback((newProfile: StudentProfile) => {
    ProfileRepository.saveProfile(newProfile);
    setProfile(newProfile);
  }, []);

  const updateProfile = useCallback((partial: Partial<StudentProfile>) => {
    ProfileRepository.updateProfile(partial);
    setProfile((prev) => (prev ? { ...prev, ...partial } : prev));
  }, []);

  return {
    profile,
    saveProfile,
    updateProfile,
    hasProfile: profile !== null,
    isLoading,
  };
}
