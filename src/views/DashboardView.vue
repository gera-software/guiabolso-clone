<template>
    <div class="card">
        <div class="card-header">
            <h2>Gastos do mês</h2>
        </div>
        <div class="card-body">
            <div class="donut">
                <svg class="donut-chart" :viewBox="`0 0 ${viewBox} ${viewBox}`">
                    <path
                        v-for="slice in donutSlices" :key="slice.label"
                        :fill="slice.color"
                        :d="slice.commands"
                        :transform="`rotate(${slice.offset})`"
                    >
                        <title>{{slice.label}}</title>
                    </path>
                </svg>
                <ul class="donut-legend">
                    <li v-for="slice in donutSlices" :key="slice.label">
                        <div class="color" :style="{ 'background-color': slice.color }"></div>
                        <div class="label">{{ slice.label }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

export interface DonutSlice {
  percent: number;
  color: string;
  label?: string;
  onClickCb?: () => void;
}

interface DonutSliceWithCommands extends DonutSlice {
  offset: number; // This is the offset that we will use to rotate the slices
  commands: string; // This will be what goes inside the d attribute of the path tag
}


 function getSlicesWithCommandsAndOffsets(
    donutSlices: DonutSlice[],
    radius: number,
    svgSize: number,
    borderSize: number
  ): DonutSliceWithCommands[] {
    let previousPercent = 0;
    return donutSlices.map((slice) => {
      const sliceWithCommands: DonutSliceWithCommands = {
        ...slice,
        commands: getSliceCommands(slice, radius, svgSize, borderSize),
        offset: previousPercent * 3.6 * -1,
      };
      previousPercent += slice.percent;
      return sliceWithCommands;
    });
  }

 function getSliceCommands(
    donutSlice: DonutSlice,
    radius: number,
    svgSize: number,
    borderSize: number
  ): string {
    const degrees = percentToDegrees(donutSlice.percent);
    const longPathFlag = degrees > 180 ? 1 : 0;
    const innerRadius = radius - borderSize;

    const commands: string[] = [];
    commands.push(`M ${svgSize / 2 + radius} ${svgSize / 2}`);
    commands.push(
      `A ${radius} ${radius} 0 ${longPathFlag} 0 ${getCoordFromDegrees(
        degrees,
        radius,
        svgSize
      )}`
    );
    commands.push(
      `L ${getCoordFromDegrees(degrees, innerRadius, svgSize)}`
    );
    commands.push(
      `A ${innerRadius} ${innerRadius} 0 ${longPathFlag} 1 ${
        svgSize / 2 + innerRadius
      } ${svgSize / 2}`
    );
    return commands.join(' ');
  }

 function getCoordFromDegrees(angle: number, radius: number, svgSize: number): string {
    const x = Math.cos((angle * Math.PI) / 180);
    const y = Math.sin((angle * Math.PI) / 180);
    const coordX = x * radius + svgSize / 2;
    const coordY = y * -radius + svgSize / 2;
    return [coordX, coordY].join(' ');
  }

 function percentToDegrees(percent: number): number {
    // return percent * 3.6;
    // fix bug when the percent is 100% the slice is not drawing...
    return percent * 3.6 === 360 ? 359.99 : percent * 3.6
  }


const data = ref<DonutSlice[]>([
    {
        percent: 45,
        color: 'red',
        label: 'Mercado',
    },
    {
        percent: 25,
        color: 'green',
        label: 'Família / Filhos',
    },
    {
        percent: 5,
        color: 'blue',
        label: 'TV / Internet / Telefone',
    },
    {
        percent: 7,
        color: 'pink',
        label: 'Outras categorias',
    }
])

const donutSlices = computed(() => {
     return getSlicesWithCommandsAndOffsets(data.value, radius.value, viewBox.value, borderSize.value)
})

const viewBox = ref(100);
const radius = ref(45);
const borderSize = ref(30);

</script>

<style scoped>

.card {
  background-color: white;
  margin: 30px 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                       0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                       0px 2px 1px -1px rgba(0, 0, 0, 0.12);

}

.card-header {
  margin-bottom: 15px;
}
.card-header h2 {
  font-weight: 600;
  color: #404040;
  font-size: 22px;
  margin: 0;
}

.donut {
    display: flex;
    gap: 10px;
}

.donut-chart {
    /* max-width: 200px; */
}

.donut-chart path {
    transform-origin: center;
}

.donut-legend {
    list-style-type: none;
    margin: 0;
    padding: 0;
    max-width: 40%;
}

.donut-legend li {
    padding: 10px 0;
    display: flex;
    gap: 10px;
    align-items: center;
}

.donut-legend .label {
    font-size: .8em;
    color: #454545;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.donut-legend .color {
    width: 1em;
    height: 1em;
    background-color: gray;
    border-radius: 100%;
    flex-shrink: 0;
}


</style>
