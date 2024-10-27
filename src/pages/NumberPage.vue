<template>
    <q-page class="q-pa-md">
      <q-card flat bordered class="col b-card">
        <q-card-section class="q-gutter-md text-center">
          <div class="text-h5 text-bold">Number Generator</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="q-gutter-md">
          <q-input filled v-model="result" label="Result" readonly >
            <template v-slot:append>
              <q-icon name="mdi-clipboard-multiple-outline" @click="general.copyClipboard(result)" />
            </template>
          </q-input>
  
          <q-input filled v-model="minNum" type="number" label="Minimum" />

          <q-input filled v-model="maxNum" type="number" label="Maximum" />
  
          <div class="text-center">
            <q-btn label="Generate" type="submit" color="primary" class="full-width" @click="generate()" />
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';

import { useGeneralStore } from '../stores/general';

const general = useGeneralStore();
const result = ref('');
const minNum = ref(1);
const maxNum = ref(100);

const generate = async () => {
    const newGen = await general.generateRandomNumber(minNum.value, maxNum.value);
    result.value = newGen.toString();
};
defineOptions({
    name: 'NumberPage'
});
</script>
  