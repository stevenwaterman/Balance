<script lang="ts">
  export let y: number;
</script>

<style>
  line {
    stroke-width: 0.5;
    z-index: -1;
    opacity: 0.5;
  }
</style>

<line x1="0" x2="1" y1={y} y2={y} fill="none" stroke="black" vector-effect="non-scaling-stroke"/>
