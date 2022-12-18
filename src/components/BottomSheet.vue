<template>
    <div class="overlay" v-if="modelValue" @click="closeBottomSheet"></div>
    <Transition name="slideup">
        <div class="bottom-sheet" v-if="modelValue">
            <span @click="closeBottomSheet">Click to close</span>
            <slot>
                Bottom sheet
            </slot>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    modelValue: String
}>()

const emit = defineEmits(['update:modelValue'])


function closeBottomSheet() {
    emit('update:modelValue', false)
}
</script>

<style scoped>
.overlay {
    background-color: black;
    opacity: .3;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
}

.bottom-sheet {
    background-color: pink;
    padding: 30px;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 15;
}

</style>