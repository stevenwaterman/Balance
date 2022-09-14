import type { Score } from "./dataSet";
import * as d3 from "d3";

export type SingleScore = { date: number; value: number };

function extractSingleScore(
  data: Score[],
  scoreType: "serenity" | "growth" | "belonging"
): SingleScore[] {
  return data.map(elem => ({ 
    date: elem.date.getTime(),
    value: elem[scoreType]
  }));
}

function movingAvg(data: SingleScore[], windowMillis: number): SingleScore[] {
  if (data.length === 0) return [];

  windowMillis = Math.max(1, windowMillis);

  const inflectionPoints: number[] = data.flatMap(elem => [elem.date, elem.date + windowMillis]);
  const xValues = [...new Set(inflectionPoints)]
  xValues.sort((a,b) => a-b);

  const dataLookup: Record<number, SingleScore> = {};
  data.forEach(elem => dataLookup[elem.date] = elem);

  const window: SingleScore[] = [];
  const output: SingleScore[] = [];

  xValues
    .forEach(date => {
      const xMin = date - windowMillis;
      while (window.length >= 2 && window[1].date <= xMin) window.shift();

      const windowAdd = dataLookup[date];
      if (windowAdd !== undefined) window.push(windowAdd);

      if (window.length === 0) return;

      const value = windowAvg(window, date, xMin);
      if (value !== undefined) {
        output.push({ date: date - (windowMillis / 2), value });
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

function clampData(data: SingleScore[], desiredRange: { start: Date, end: Date }) {
  const startMillis = desiredRange.start.getTime();
  const endMillis = desiredRange.end.getTime();

  const bisector = d3.bisector<SingleScore, number>((a,b) => a.date - b);

  // TODO the 0, data.length SHOULD be optional, but for some reason the compiler is removing them?!
  // Step through it in a debugger - the last 2 args are missing defaults on bisector.right
  // It works if you do console.log({bisector}) though - it's just completely fucked
  // We might investigate this properly later
  const leftIdx = bisector.left(data, startMillis, 0, data.length);
  const rightIdx = bisector.right(data, endMillis, 0, data.length);
  const clampedData = data.slice(leftIdx, rightIdx);

  const beforeStart = data[leftIdx - 1];
  const afterStart = data[leftIdx];
  const newStart = interpolate(beforeStart, afterStart, startMillis);
  if (newStart !== undefined) clampedData.unshift(newStart);

  const beforeEnd = data[rightIdx - 1];
  const afterEnd = data[rightIdx];
  const newEnd = interpolate(beforeEnd, afterEnd, endMillis);
  if (newEnd !== undefined) clampedData.push(newEnd);

  return clampedData;
}

function interpolate(before: SingleScore, after: SingleScore, targetDate: number): SingleScore | undefined {
  if (before === undefined || after === undefined) return undefined;

  const xDelta = after.date - before.date;
  const targetFraction = (targetDate - before.date) / xDelta;

  const targetValue = (before.value * (1 - targetFraction)) + (after.value * targetFraction);
  return {
    date: targetDate,
    value: targetValue
  }
}

export function getDataSeries(
  data: Score[],
  scoreType: "serenity" | "growth" | "belonging",
  windowMillis: number,
  desiredRange: { start: Date, end: Date }
): SingleScore[] {
  const singleScore = extractSingleScore(data, scoreType);
  const blurred = movingAvg(singleScore, windowMillis);
  const clamped = clampData(blurred, desiredRange);
  return clamped;
}
