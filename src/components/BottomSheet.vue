<template>
    <!-- <div class="overlay" v-if="isBottomSheetOpen" @click="closeBottomSheet"></div> -->
    <Transition name="slideup">
        <div class="bottom-sheet" v-if="isBottomSheetOpen">
            <span @click="closeBottomSheet">Click to close</span>
            <slot>
                Bottom sheet
            </slot>
        </div>
    </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits(['close-bottom-sheet'])

const props = defineProps<{
    isBottomSheetOpen: boolean
}>()


function closeBottomSheet() {
    emit('close-bottom-sheet')
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