export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Score = {
  date: Date;
  personal: Digit;
  professional: Digit;
  spiritual: Digit;
};

class DataSet {
  private readonly views: Record<string, DataView> = {};
  private readonly months: Record<string, Promise<void>> = {};
  private readonly data: Score[] = [];

  async getView(minDate: Date, maxDate: Date): Promise<DataView> {
    await this.downloadData(minDate, maxDate);
    const destroy = (id: string) => delete this.views[id];
    const view = createDataView(this.data, minDate, maxDate, destroy);
    this.views[view.id] = view;
    return view;
  }

  private async downloadData(minDate: Date, maxDate: Date) {
    const promises: Promise<void>[] = [];

    let maxYear = maxDate.getFullYear();
    let maxMonth = maxDate.getMonth() + 1;

    let year = minDate.getFullYear();
    let month = minDate.getMonth() + 1;

    while ((year + month / 12) <= (maxYear + maxMonth / 12)) {
      promises.push(this.downloadMonthIfNeeded(year, month));

      month++;
      if (month > 12) {
        month = 1;
        year++;
      }
    }

    await Promise.all(promises);
  }

  private async downloadMonthIfNeeded(year: number, month: number): Promise<void> {
    const name = `${year}-${month}`;
    if (name in this.months) return this.months[name];

    const promise = this.downloadMonth(name);
    this.months[name] = promise;
    return promise;
  }

  private async downloadMonth(name: string): Promise<void> {
    const response: Record<number, [number, number, number]> =
      await fetch(`https://raw.githubusercontent.com/stevenwaterman/Balance/historical-data/data/${name}.json`)
        .then(res => res.json())
        .catch(() => ({}));

    const scores: Score[] = Object.entries(response)
      .map(([timestampString, [personal, professional, spiritual]]) => {
        const timestamp = parseInt(timestampString);
        return {
          date: new Date(timestamp * 1000),
          personal: personal as Digit,
          professional: professional as Digit,
          spiritual: spiritual as Digit
        };
      });

    this.data.push(...scores);
    this.data.sort((a, b) => a.date.getTime() - b.date.getTime());

    for (const key in this.views) {
      this.views[key].dataDownloaded();
    }
  }
}

export type DataView = Score[] & {
  id: string;
  dataDownloaded: () => void;
  destroy: () => void;
};

function createDataView(
  underlying: Score[],
  minDate: Date,
  maxDate: Date,
  destroy: (id: string) => void
): DataView {
  const id = `${minDate.getTime()}${maxDate.getTime()}`;

  let minIdx = 0;
  let maxIdx = 0;

  function dataDownloaded() {
    minIdx = underlying.findIndex(({ date }) => date >= minDate);
    if (minIdx < 0) minIdx = underlying.length;
    
    maxIdx = underlying.findIndex(({ date }) => date >= maxDate) - 1;
    if (maxIdx < 0) maxIdx = underlying.length;
  }

  dataDownloaded();

  const proxy = new Proxy(underlying, {
    set(target, property, value) {
      target[property] = value;
      return true;
    },
    has(target, property) {
      return property in target;
    },
    get(target, property) {
      if (property === "id") return id;
      if (property === "dataDownloaded") return dataDownloaded;
      if (property === "destroy") return () => destroy(id);
      if (property === "length") return maxIdx - minIdx;
      if (typeof property === "string") {
        const idx = parseInt(property);
        if (!isNaN(idx)) {
          const adjustedIdx = idx + minIdx;
          if (adjustedIdx < minIdx) return undefined;
          if (adjustedIdx > maxIdx) return undefined;
          return target[adjustedIdx];
        }
      }
      return target[property];
    },
  });

  return proxy as DataView;
}

export const dataSet = new DataSet();
