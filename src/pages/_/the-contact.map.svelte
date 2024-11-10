<script lang="ts" module>
  // TYPES *********************************************************************************************************************************
  export type SetMapOpts = { lat: number; lng: number; zoom: number };
  export type TheContactMapProps = { class: string; options: SetMapOpts };
</script>

<script lang="ts">
  // PROPS *********************************************************************************************************************************
  let { class: className, options }: TheContactMapProps = $props();

  // VARS **********************************************************************************************************************************
  let leafletCss = $state<string>();

  // ACTIONS *******************************************************************************************************************************
  export function setMap(mapElement: HTMLElement, { lat, lng, zoom }: SetMapOpts) {
    (async () => {
      const { default: css } = await import("leaflet/dist/leaflet.css?url");
      leafletCss = css;
      const L = await import("leaflet");

      const map = L.map(mapElement).setView([lat, lng], zoom);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
      L.marker([lat, lng], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: "/map/icon.png",
          iconRetinaUrl: "/map/icon2.png",
          shadowUrl: "/map/shadow.png",
        }),
      }).addTo(map);
    })();
  }
</script>

{#if leafletCss}<link rel="stylesheet" href={leafletCss} />{/if}
<figure use:setMap={options} class={className}></figure>
