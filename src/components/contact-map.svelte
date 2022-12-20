<figure use:setMap={{ lat, lng, marker, zoom }} class={cEl} />

<script lang="ts">
  import {setMap} from '~/data/map';

  // PROPS =================================================================================================================================
  export let lat: number;
  export let lng: number;
  export let zoom = 19;
  export let marker = '';

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};

  // VARS ==================================================================================================================================
  let hover = false;

  // EVENTS ================================================================================================================================
  const onMouseover = () => (hover = true);
</script>

<style>
  /* figure {
    width: 38rem;
    height: 21rem;
    box-shadow: var(--shadow-elevation-low);
  } */
</style>
