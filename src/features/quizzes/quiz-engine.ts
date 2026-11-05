import type { Question, Answer, GameState } from "@/types";

export class QuizEngine {
  private questions: Question[];
  private state: GameState;

  constructor(questions: Question[], lessonId: string) {
    this.questions = questions;
    this.state = {
      currentLessonId: lessonId,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      isComplete: false,
      startedAt: new Date().toISOString(),
    };
  }

  getCurrentQuestion(): Question | null {
    if (this.state.isComplete) return null;
    return this.questions[this.state.currentQuestionIndex] ?? null;
  }

  answerQuestion(answer: string | string[]): {
    isCorrect: boolean;
    pointsEarned: number;
    explanation?: string;
  } {
    const question = this.getCurrentQuestion();
    if (!question) {
      return { isCorrect: false, pointsEarned: 0 };
    }

    const normalise = (v: string | string[]) =>
      Array.isArray(v)
        ? v.map((s) => s.trim().toLowerCase()).sort()
        : v.trim().toLowerCase();

    const userNorm = normalise(answer);
    const correctNorm = normalise(question.correctAnswer);
    const isCorrect =
      JSON.stringify(userNorm) === JSON.stringify(correctNorm);

    const pointsEarned = isCorrect ? question.points : 0;

    const recordedAnswer: Answer = {
      questionId: question.id,
      userAnswer: answer,
      isCorrect,
      pointsEarned,
      timestamp: new Date().toISOString(),
    };

    this.state = {
      ...this.state,
      answers: [...this.state.answers, recordedAnswer],
      score: this.state.score + pointsEarned,
    };

    return {
      isCorrect,
      pointsEarned,
      explanation: question.explanationEn ?? question.explanation,
    };
  }

  /** Advances to the next question. Returns true if there is a next question. */
  nextQuestion(): boolean {
    const nextIndex = this.state.currentQuestionIndex + 1;
    if (nextIndex >= this.questions.length) {
      this.state = { ...this.state, isComplete: true };
      return false;
    }
    this.state = { ...this.state, currentQuestionIndex: nextIndex };
    return true;
  }

  getState(): GameState {
    return { ...this.state };
  }

  /** Returns the quiz score as a 0-100 percentage. */
  getScore(): number {
    const maxPoints = this.questions.reduce((sum, q) => sum + q.points, 0);
    if (maxPoints === 0) return 0;
    return Math.round((this.state.score / maxPoints) * 100);
  }

  /** Returns total points earned so far. */
  getTotalPoints(): number {
    return this.state.score;
  }

  isComplete(): boolean {
    return this.state.isComplete;
  }

  reset(): void {
    this.state = {
      currentLessonId: this.state.currentLessonId,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      isComplete: false,
      startedAt: new Date().toISOString(),
    };
  }
}
