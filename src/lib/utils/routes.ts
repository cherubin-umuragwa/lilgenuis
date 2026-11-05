export const ROUTES = {
  home: (locale: string) => `/${locale}`,
  subjects: (locale: string) => `/${locale}/subjects`,
  subject: (locale: string, subjectId: string) => `/${locale}/subjects/${subjectId}`,
  lesson: (locale: string, subjectId: string, lessonId: string) =>
    `/${locale}/subjects/${subjectId}/lessons/${lessonId}`,
  quiz: (locale: string, subjectId: string, lessonId: string) =>
    `/${locale}/subjects/${subjectId}/lessons/${lessonId}/quiz`,
  dashboard: (locale: string) => `/${locale}/dashboard`,
  achievements: (locale: string) => `/${locale}/achievements`,
  profile: (locale: string) => `/${locale}/profile`,
  explore: (locale: string) => `/${locale}/explore`,
  challenges: (locale: string) => `/${locale}/challenges`,
  about: (locale: string) => `/${locale}/about`,
  parents: (locale: string) => `/${locale}/parents`,
  teachers: (locale: string) => `/${locale}/teachers`,
  login: (locale: string) => `/${locale}/login`,
  register: (locale: string) => `/${locale}/register`,
  onboarding: (locale: string) => `/${locale}/onboarding`,
};

export function buildRoute(path: string, params?: Record<string, string>): string {
  if (!params) return path;
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, encodeURIComponent(value)),
    path
  );
}
