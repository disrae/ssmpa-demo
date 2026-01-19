// Simple className utility (we'll add clsx later if needed)
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Parse time string (MM:SS or M:SS) or number to seconds
export function parseTimeToSeconds(timeInput: string | number): number {
  if (typeof timeInput === 'number') {
    return timeInput;
  }

  // Handle string input
  const timeStr = timeInput.trim();

  // If it's just a number as string, convert directly
  if (/^\d+$/.test(timeStr)) {
    return parseInt(timeStr, 10);
  }

  // Handle MM:SS or M:SS format
  const timeMatch = timeStr.match(/^(\d+):(\d+)$/);
  if (timeMatch) {
    const minutes = parseInt(timeMatch[1], 10);
    const seconds = parseInt(timeMatch[2], 10);
    return minutes * 60 + seconds;
  }

  // Fallback - try to parse as number
  const parsed = parseFloat(timeStr);
  if (!isNaN(parsed)) {
    return Math.floor(parsed);
  }

  throw new Error(`Invalid time format: ${timeInput}. Use MM:SS, M:SS, or seconds as number.`);
}

// Test function to verify parsing works
// console.log(parseTimeToSeconds("2:33")); // Should return 153
// console.log(parseTimeToSeconds("0:45")); // Should return 45
// console.log(parseTimeToSeconds(120));    // Should return 120
// console.log(parseTimeToSeconds("120"));  // Should return 120

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
