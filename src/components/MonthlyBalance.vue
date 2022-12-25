<template>
    <div class="monthlyBalance">
        <div class="container">
            <h2>Contas e cartões</h2>

            <div class="flex">
                <div class="row">
                    <div class="col1">Saldo das contas</div>
                    <div class="col2">R$ 2,00</div>
                </div>
                <div class="row">
                    <div class="col1">Fatura dos cartões</div>
                    <div class="col2">R$ -353453452,00</div>
                </div>
                <div class="row">
                    <div class="col1">Dinheiro</div>
                    <div class="col2">R$ 2345345345345345,00</div>
                </div>
                <div class="row">
                    <div class="col1">Total</div>
                    <div class="col2">R$ 243534535345345,00</div>
                </div>
            </div>
            <router-link class="accounts-link" :to="{ name: 'accounts'}">Ir para contas e cartões</router-link>
        </div>
    </div>
</template>
<script setup lang="ts">


</script>

<style scoped>

.monthlyBalance {
    background-color: #250048;
}

.container {
    padding: 15px 25px;
    color: white;
}

h2 {
    margin: 0;
    font-weight: 600;
    font-size: 20px;
    /* color: #404040; */
}

.flex {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
}

.row {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    overflow: hidden;
    border-bottom: 2px dotted rgba(255, 255, 255, 0.3);
}

.col1 {
    width: 100%;
    overflow: hidden;
}

.col2 {
    font-weight: 600;
    flex-shrink: 0;
    text-align: right;
}

.accounts-link {
    font-size: .9em;
    color: #FB396A;
}

</style>