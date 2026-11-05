import { mathematics } from './mathematics';
import { science } from './science';
import { geography } from './geography';
import { history } from './history';
import { languages } from './languages';
import { generalKnowledge } from './general-knowledge';
import { logic } from './logic';
import { programming } from './programming';
import type { Subject, Lesson } from '@/types';

export const allSubjects: Subject[] = [
  mathematics, science, geography, history, languages, generalKnowledge, logic, programming,
];

export function getSubjectById(id: string): Subject | undefined {
  return allSubjects.find(s => s.id === id);
}

export function getLessonsBySubject(subjectId: string): Lesson[] {
  return getSubjectById(subjectId)?.lessons ?? [];
}

export function getLessonById(subjectId: string, lessonId: string): Lesson | undefined {
  return getLessonsBySubject(subjectId).find(l => l.id === lessonId);
}

export {
  mathematics,
  science,
  geography,
  history,
  languages,
  generalKnowledge,
  logic,
  programming,
};

export default allSubjects;
