export type TickData = {
  position: number;
  label: string;
}

export function getTicks(
  [min, max]: [number, number],
  positionInterval: number,
  interval: number,
  labelFunction: (value: number) => string
): TickData[] {
  if (interval <= 0) return [];

  const first = Math.ceil(min / positionInterval) * positionInterval;
  const ticks: number[] = [];
  for (let i = first; i <= max; i += interval) {
    ticks.push(i);
  }

  const range = max - min;
  return ticks.map(tick => ({
    position: tick,
    label: labelFunction(tick)
  }));
}

export function getInterval(
  [min, max]: [number, number] | [undefined, undefined],
  tickCount: number
): number {
  if (min === undefined || max === undefined) return 1;
  const range = max - min;
  return Math.round(range / tickCount);
}

const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function labelTickDate(tick: number): string {
  const date = new Date(tick);
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  return `${day} ${months[month]}`;
}

export function defaultTickIntervalX([min, max]: [number, number] | [undefined, undefined]): number {
  const millisPerDay = 24 * 3600 * 1000;

  if (min === undefined || max === undefined) return millisPerDay;
  const range = max - min;
  const rangeDays = range / millisPerDay;
  const daysPerTick = Math.ceil(rangeDays / 15);
  return daysPerTick * millisPerDay;
}