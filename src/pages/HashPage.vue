<template>
    <q-page class="q-pa-md">
      <q-card flat bordered class="col b-card">
        <q-card-section class="q-gutter-md text-center">
          <div class="text-h5 text-bold">Hash Generator</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="q-gutter-md">
          <q-input filled v-model="result" label="Result" type="textarea" readonly >
            <template v-slot:append>
              <q-icon name="mdi-clipboard-multiple-outline" @click="general.copyClipboard(result)" />
            </template>
          </q-input>

          <q-select filled v-model="model" :options="options" label="Select Hash" />

          <q-input filled v-model="dataText" label="Text" type="textarea" />

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
const dataText = ref('');
const model = ref('MD5');
const options = ref(['MD5', 'RIPEMD160', 'SHA1', 'SHA3', 'SHA224', 'SHA256', 'SHA384', 'SHA512']);

const generate = async () => {
    result.value = await general.generateHash(model.value, dataText.value);
};
defineOptions({
    name: 'HashPage'
});
</script>
