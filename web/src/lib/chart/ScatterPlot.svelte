<script lang="ts">
  import type { Score } from "$lib/dataSet";
  import { getDataSeries, type SingleScore } from "$lib/transformation";
  import Axes from "./Axes.svelte";
  import DataLine from "./DataLine.svelte";

  export let width: number = 460;
  export let height: number = 400;

  export let margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  } = {
    top: 40,
    right: 10,
    bottom: 10,
    left: 10
  };

  export let data: Score[];

  let personal: SingleScore[];
  $: personal = getDataSeries(data, "personal", 24);

  let professional: SingleScore[];
  $: professional = getDataSeries(data, "professional", 24);

  let spiritual: SingleScore[];
  $: spiritual = getDataSeries(data, "spiritual", 24);
</script>

<style>
  svg {
    width: 90vw;
    height: 90vh;
  }
</style>

<svg viewBox={`0 0 ${width} ${height}`}>
  <circle cx="20" cy="10" r="5" fill="var(--red)"/>
  <text x="30" y="13" fill="var(--red)" font-size="10">Personal</text>

  <circle cx="125" cy="10" r="5" fill="var(--green)"/>
  <text x="135" y="13" fill="var(--green)" font-size="10">Professional</text>

  <circle cx="240" cy="10" r="5" fill="var(--blue)"/>
  <text x="250" y="13" fill="var(--blue)" font-size="10">Spiritual</text>

  <g transform={`translate(${margin.left}, ${margin.top})`}>
    <Axes
      {data}
      width={width - margin.left - margin.right}
      height={height - margin.top - margin.bottom}
      let:xScale
      let:yScale
    >
      <DataLine series={personal} color="var(--red)" {xScale} {yScale} />
      <DataLine series={professional} color="var(--green)" {xScale} {yScale} />
      <DataLine series={spiritual} color="var(--blue)" {xScale} {yScale} />
    </Axes>
  </g>

  

    <!-- <g fill="none" font-size="10" font-family="sans-serif" text-anchor="end"
      ><path class="domain" stroke="#000" d="M-6,360.5H0.5V0.5H-6" /><g
        class="tick"
        opacity="1"
        transform="translate(0,360.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,000</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,330.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,100</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,300.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,200</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,270.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,300</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,240.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,400</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,210.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,500</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,180.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,600</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,150.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,700</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,120.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,800</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,90.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >8,900</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,60.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >9,000</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,30.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >9,100</text
        ></g
      ><g class="tick" opacity="1" transform="translate(0,0.5)"
        ><line stroke="#000" x2="-6" /><text fill="#000" x="-9" dy="0.32em"
          >9,200</text
        ></g
      ></g
    ><path
      fill="none"
      stroke="#69b3a2"
      stroke-width="1.5"
      d="M0,317.787L41.11111111111111,258.474L82.22222222222221,248.65500000000011L123.33333333333333,274.2120000000003L164.44444444444443,300.6600000000002L205.55555555555557,270.39299999999986L246.66666666666666,95.93100000000015L287.77777777777777,60.7290000000001L328.88888888888886,59.50800000000015L370,72.43500000000023"
    /><g
      ><circle cx="0" cy="317.787" r="5" fill="#69b3a2" /><circle
        cx="41.11111111111111"
        cy="258.474"
        r="5"
        fill="#69b3a2"
      /><circle
        cx="82.22222222222221"
        cy="248.65500000000011"
        r="5"
        fill="#69b3a2"
      /><circle
        cx="123.33333333333333"
        cy="274.2120000000003"
        r="5"
        fill="#69b3a2"
      /><circle
        cx="164.44444444444443"
        cy="300.6600000000002"
        r="5"
        fill="#69b3a2"
      /><circle
        cx="205.55555555555557"
        cy="270.39299999999986"
        r="5"
        fill="#69b3a2"
      /><circle
        cx="246.66666666666666"
        cy="95.93100000000015"
        r="5"
        fill="#69b3a2"
      /><circle
        cx="287.77777777777777"
        cy="60.7290000000001"
        r="5"
        fill="#69b3a2"
      /><circle
        cx="328.88888888888886"
        cy="59.50800000000015"
        r="5"
        fill="#69b3a2"
      /><circle cx="370" cy="72.43500000000023" r="5" fill="#69b3a2" /></g
    ></g -->
</svg>
