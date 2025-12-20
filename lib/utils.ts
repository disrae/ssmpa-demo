// Simple className utility (we'll add clsx later if needed)
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Format time in MM:SS format
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Check if current time matches question time (with 1 second tolerance)
export function shouldShowQuestion(currentTime: number, questionTime: number): boolean {
  return Math.abs(currentTime - questionTime) <= 1;
}

// Calculate progress percentage
export function calculateProgress(completed: number, total: number): number {
  return Math.round((completed / total) * 100);
}

// Validate multiple choice answer
export function validateMultipleChoice(userAnswer: number, correctAnswer: number): boolean {
  return userAnswer === correctAnswer;
}

// Validate true/false answer
export function validateTrueFalse(userAnswer: boolean, correctAnswer: boolean): boolean {
  return userAnswer === correctAnswer;
}

// Validate short answer (simple string match for demo)
export function validateShortAnswer(userAnswer: string, correctAnswer: string): boolean {
  return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
}
