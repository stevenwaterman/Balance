import { derived, writable, type Readable, type Writable } from "svelte/store";
import { dataSet, type DataView } from "./dataSet";
import * as d3 from "d3";

export type BoolWritable = Writable<boolean> & { toggle: () => void };

function togglableBoolStore(init: boolean): BoolWritable {
  const underlying = writable(init);
  return {
    ...underlying,
    toggle: () => underlying.update(value => !value)
  };
}

export const enablePersonalStore: BoolWritable = togglableBoolStore(true);
export const enableProfessionalStore: BoolWritable = togglableBoolStore(true);
export const enableSpiritualStore: BoolWritable = togglableBoolStore(true);

export const windowFractionStore: Writable<number> = writable(0.1);

export const minRangeSeparationDays: number = 1;
export const rangeMin = new Date("2022-06-29T00:00:00Z");
export const rangeMax = new Date();
rangeMax.setUTCDate(rangeMax.getUTCDate() - 1);
rangeMax.setUTCHours(0, 0, 0, 0);

const minEnd = new Date(rangeMin.getTime());
minEnd.setUTCDate(minEnd.getUTCDate() + minRangeSeparationDays);

const maxStart = new Date(rangeMax.getTime());
maxStart.setUTCDate(maxStart.getUTCDate() - minRangeSeparationDays);

const defaultRangeStart = new Date(rangeMax);
defaultRangeStart.setUTCDate(defaultRangeStart.getUTCDate() - 14);

const internalDesiredRangeStore: Writable<{ start: Date, end: Date }> = writable({ start: defaultRangeStart, end: rangeMax });
function clampDesiredRange(value: { start: Date, end: Date }): { start: Date, end: Date } {
  let start = value.start;
  if (isNaN(start.getTime())) start = rangeMin;
  if (start < rangeMin) start = rangeMin;
  if (start > maxStart) start = maxStart;

  let end = value.end;
  if (isNaN(end.getTime())) end = rangeMax;
  if (end < minEnd) end = minEnd;
  if (end > rangeMax) end = rangeMax;

  const requiredTimeDifference = minRangeSeparationDays * 24 * 3600 * 1000;
  const timeDifference = end.getTime() - start.getTime();
  if (timeDifference >= requiredTimeDifference) return { start, end };

  const midPoint = start.getTime() + timeDifference / 2;
  const adjustedStart = midPoint - requiredTimeDifference / 2;
  const adjustedEnd = midPoint + requiredTimeDifference / 2;
  return { start: new Date(adjustedStart), end: new Date(adjustedEnd) };
}
function setDesiredRange(value: { start: Date, end: Date }) {
  internalDesiredRangeStore.set(clampDesiredRange(value));
}
function updateDesiredRange(updater: (current: { start: Date; end: Date }) => { start: Date; end: Date }) {
  internalDesiredRangeStore.update(value => {
    const newValue = updater(value);
    return clampDesiredRange(newValue);
  })
}
export const desiredRangeStore: Writable<{ start: Date, end: Date }> = {
  subscribe: internalDesiredRangeStore.subscribe,
  set: setDesiredRange,
  update: updateDesiredRange
};

export const xExtentStore: Readable<[number, number]> = 
  derived(desiredRangeStore, desiredRange => 
    [desiredRange.start.getTime(), desiredRange.end.getTime()] as [number, number]);

export const windowMillisStore: Readable<number> = derived(
  [desiredRangeStore, windowFractionStore],
  ([desiredRange, windowFraction]) => {
    const rangeSize = desiredRange.end.getTime() - desiredRange.start.getTime();
    return rangeSize * windowFraction;
  })

const actualRangeStore: Readable<{start: Date, end: Date}> = derived(
  [desiredRangeStore, windowMillisStore], ([desiredRange, windowMillis]) => ({ 
    start: new Date(desiredRange.start.getTime() - windowMillis - (24 * 3600 * 1000)),
    end: new Date(desiredRange.end.getTime() + windowMillis + (24 * 3600 * 1000))
  })
);

let currentDataView: Promise<DataView> | undefined = undefined;
export const dataViewStore: Readable<Promise<DataView>> = derived(actualRangeStore, ({start, end}) => {
  if (currentDataView !== undefined) {
    currentDataView.then(dataView => dataView.destroy());
  }

  const newDataView = dataSet.getView(start, end);
  currentDataView = newDataView;
  return newDataView;
});

type GraphDimensions = {
  width: number;
  height: number;
  axes: {
    separation: number;
    xHeight: number;
    yWidth: number;
  }
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }
}

export const graphDimensionsStore: Writable<GraphDimensions> = writable({
  width: 460,
  height: 400,
  axes: {
    separation: 10,
    xHeight: 20,
    yWidth: 20
  },
  margin: {
    top: 40,
    right: 10,
    bottom: 10,
    left: 10
  }
})

export const axesDimensionsStore: Readable<{ width: number; height: number }> =
  derived(graphDimensionsStore, dims => ({
    width: dims.width - dims.margin.left - dims.margin.right,
    height: dims.height - dims.margin.top - dims.margin.bottom
  }))

export const dataDimensionsStore: Readable<{ width: number; height: number }> =
  derived(graphDimensionsStore, dims => ({
    width: dims.width - dims.axes.yWidth - dims.axes.separation - dims.margin.left - dims.margin.right,
    height: dims.height - dims.axes.xHeight - dims.axes.separation - dims.margin.top - dims.margin.bottom
  }));

export const xScaleStore: Readable<d3.ScaleLinear<number, number, never>> = 
  derived([xExtentStore, dataDimensionsStore], ([xExtent, dims]) => 
    d3.scaleLinear() 
      .domain(xExtent)
      .range([0, dims.width])
  );

export const yScaleStore: Readable<d3.ScaleLinear<number, number, never>> = 
  derived(dataDimensionsStore, dims => 
    d3.scaleLinear() 
      .domain([0, 9])
      .range([dims.height, 0])
  );
