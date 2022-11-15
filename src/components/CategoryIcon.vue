<template>
    <div class="circle" :style="{ color: color, 'border-color': color, fill: color }">
        <component :is="props.icon+'Icon'"></component>
    </div>
</template>
<script setup lang="ts">

const props = defineProps(['icon', 'color'])
console.log(props.icon)
console.log(props.color)

</script>

<style scoped>
.circle {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 36px;
    height: 36px;
    border: 1px solid rgb(0, 0, 0);
    color: rgb(0, 0, 0);
    fill: rgb(0, 0, 0);
    flex-shrink: 0;
}
</style>