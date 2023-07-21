export interface bmiValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  // height in cm, weight in kg
  if (height === 0) throw new Error('Can\t divide by 0!');
  const bmi: number = weight / (height / 100) ** 2; // convert height to m
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal Weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};
