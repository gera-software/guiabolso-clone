<template>
    <div class="barchart">
        <div class="chartarea">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <div class="y-labels">
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
            <div class="label">
                <span>R$ 91234</span> 
                <LifestyleFamilyIcon class="icon"></LifestyleFamilyIcon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LifestyleFamilyIcon from '@/components/icons/LifestyleFamilyIcon.vue'
</script>

<style scoped>
.barchart {
    /* background-color: rgb(219, 121, 121); */
    height: 240px;
    padding: 15px;
    overflow-y: auto;
}

.chartarea {
    display: flex;
    height: 140px;
    flex-wrap: nowrap;
    align-items: flex-end;
    border-bottom: 1px solid #E8E8E8;
    width: fit-content;
}

.barchart .bar {
    content: '';
    height: 30%;
    width: 44px;
    background-color: #E8E8E8;
;
    margin: 0 20px;
    flex-shrink: 0;
    /* border: 1px solid white; */
}

.barchart .y-labels {
    display: flex;
    /* background-color: blue; */
    flex-wrap: nowrap;
    width: fit-content;
    padding-top: 10px;
}

.y-labels .label {
    font-family: 'Open Sans';
    font-weight: 700;
    font-size: 12px;
    /* margin: 0 20px; */
    flex-shrink: 0;
    width: 84px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.y-labels .label .icon {
    margin: 10px;
    /* background-color: rebeccapurple; */
}

</style>