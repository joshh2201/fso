import { isNotNumber } from './utils';
interface exerciseSummary {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  targetMet: boolean;
  rating: number;
  ratingDescription: string;
}

interface exerciseArgs {
  target: number;
  exerciseHours: number[];
}

const parseArguments = (args: string[]): exerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const exerciseHours = args.slice(3).map((day) => Number(day));
  if (!isNotNumber(args[2]) && !exerciseHours.every(isNotNumber)) {
    return {
      target: Number(args[2]),
      exerciseHours,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

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

try {
  const { target, exerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
