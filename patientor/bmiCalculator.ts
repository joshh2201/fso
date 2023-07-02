const calculateBmi = (height: number, weight: number): string => {
  // height in cm, weight in kg
  const bmi: number = weight / (height / 100) ** 2; // convert height to m
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal Weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30) {
    return 'Obese';
  }
};

console.log(calculateBmi(180, 74));
