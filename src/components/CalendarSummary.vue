<template>
    <div class="calendar-summary" @click="handleClick">
        <div class="row">
            <span class="description">Net vovó</span>
            <span class="badge">atrasado</span>
        </div>
        <span class="amount">R$ 137,00</span>
    </div>
</template>
<script setup lang="ts">

function handleClick() {
    console.log('clicked')
}

</script>

<style scoped>

.calendar-summary {
    background-color: white;
    margin: 15px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                       0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                       0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    border-left: 5px solid red;
    padding: 15px 15px;
    gap: 8px;
}

.calendar-summary .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.calendar-summary .description {
    font-size: 1em;
    color: #454545;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.calendar-summary .amount {
    font-size: 1.3em;
    font-weight: bold;
    color: #222222;
}

.calendar-summary .badge {
    font-size: .7em;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    background-color: red;
    border-radius: 10px;
    padding: 2px 15px;
    width: fit-content;
}

</style>