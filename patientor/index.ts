import express, { Request, Response, NextFunction } from 'express';
import { calculateBmi } from './utils/bmiCalculator';
import { isNotNumber } from './utils/utils';

const app = express();

function bmiParamValidator(req: Request, res: Response, next: NextFunction) {
  const { height, weight } = req.query;
  if (!height || !weight) {
    return res.status(400).json({ error: 'Missing query parameters' });
  }
  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);
  if (isNotNumber(parsedHeight) || isNotNumber(parsedWeight)) {
    return res.status(400).json({ error: 'Height and weight must be numbers' });
  }
  next();
}

app.get('/bmi', bmiParamValidator, (req: Request, res: Response) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  res.json({ height, weight, bmi: calculateBmi(height, weight) });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
