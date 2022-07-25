import type { Score } from "./dataSet";

export type SingleScore = { date: number; value: number };

function extractSingleScore(
  data: Score[],
  scoreType: "personal" | "professional" | "spiritual"
): SingleScore[] {
  return data.map(elem => ({ 
    date: elem.date.getTime(),
    value: elem[scoreType]
  }));
}

function removeGradualChange(data: SingleScore[]): SingleScore[] {
  const output: SingleScore[] = [];
  data.forEach(elem => {
    if (output.length > 0) {
      const last = output[output.length - 1];
      output.push({ date: last.date - 1, value: last.value });
    }
    output.push(elem);
  });
  return output;
}

function movingAvg(data: SingleScore[], windowHrs: number): SingleScore[] {
  if (windowHrs === 0) return data;

  const windowMillis = windowHrs * 3600 * 1000
  const inflectionPoints: number[] = data.flatMap(elem => [elem.date, elem.date + windowMillis]);
  const xValues = [...new Set(inflectionPoints)]
  xValues.sort((a,b) => a-b);

  const dataLookup: Record<number, SingleScore> = {};
  data.forEach(elem => dataLookup[elem.date] = elem);

  const window: SingleScore[] = [];
  const output: SingleScore[] = [];

  const lastX = data[data.length - 1].date;
  xValues
    .filter(x => x <= lastX)
    .forEach(date => {
      const xMin = date - windowMillis;
      while (window.length >= 2 && window[1].date <= xMin) window.shift();

      const windowAdd = dataLookup[date];
      if (windowAdd !== undefined) window.push(windowAdd);

      if (window.length === 0) return;

      const value = windowAvg(window, date, xMin);
      if (value !== undefined) {
        output.push({ date, value });
      }
    });
  
  return output;
}

function windowAvg(data: SingleScore[], now: number, xMin: number): number | undefined {
  let area = 0;
  let width = 0;
  
  for (let i = 0; i < data.length; i++) {
    const point = data[i];
    const pointStart = Math.max(point.date, xMin);
    const pointEnd = data[i+1]?.date ?? now;
    const pointRange = pointEnd - pointStart;
    area += (pointRange * point.value);
    width += pointRange;
  }

  if (width === 0) return undefined;

  return area / width;
}

export function getDataSeries(
  data: Score[],
  scoreType: "personal" | "professional" | "spiritual",
  windowHrs: number
): SingleScore[] {
  return movingAvg(extractSingleScore(data, scoreType), windowHrs)
}