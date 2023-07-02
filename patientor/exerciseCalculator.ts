interface exerciseSummary {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  targetMet: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (
  exerciseHours: number[],
  target: number
): exerciseSummary => {
  const average =
    exerciseHours.reduce((sum, curr) => (sum += curr), 0) /
    exerciseHours.length;
  let rating: number;
  let ratingDescription: string;
  if (average - target >= 0) {
    rating = 3;
    ratingDescription = 'Great job meeting your goal, keep it up!';
  } else if (Math.abs(average - target) < 0.5) {
    rating = 2;
    ratingDescription = 'You were really close to your goal!';
  } else {
    rating = 1;
    ratingDescription = 'Nice try, try re-evaluting your goal!';
  }
  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((dailyHours) => dailyHours > 0).length,
    target,
    average,
    targetMet: average >= target,
    rating,
    ratingDescription,
  };
};

console.log(calculateExercises([0, 0, 0, 4.5, 0, 3, 1], 2));
