<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="col b-card">
      <q-card-section class="q-gutter-md text-center">
        <div class="text-h5 text-bold">Password Generator</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-gutter-md">
        <q-input filled v-model="result" label="Result" type="textarea" readonly >
          <template v-slot:append>
            <q-icon name="mdi-clipboard-multiple-outline" @click="general.copyClipboard(result)" />
          </template>
        </q-input>

        <q-input filled v-model="numLength" type="number" label="Password Length" />

        <q-option-group
          v-model="groupOptions"
          :options="options"
          type="checkbox"
          inline
          dense
        />

        <div class="text-center">
          <q-btn label="Generate" type="submit" color="primary" class="full-width" @click="generate()" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { useGeneralStore } from '../stores/general';

const general = useGeneralStore();
const result = ref('');
const numLength = ref(12);
const groupOptions = ref(['op1', 'op2', 'op3', 'op4']);
const options = [
  {
    label: 'Uppercase',
    value: 'op1'
  },
  {
    label: 'Lowercase',
    value: 'op2'
  },
  {
    label: 'Numbers',
    value: 'op3'
  },
  {
    label: 'Symbols',
    value: 'op4'
  }
];
const conditionCharacters = computed(() => {
  var passCharacters = '';
  if (groupOptions.value.includes('op1')) passCharacters += general.uppercase;
  if (groupOptions.value.includes('op2')) passCharacters += general.lowercase;
  if (groupOptions.value.includes('op3')) passCharacters += general.numbers;
  if (groupOptions.value.includes('op4')) passCharacters += general.symbols;
  return passCharacters;
});

const generate = async () => {
  const newGen = await general.generateCharacters(numLength.value, conditionCharacters.value);
  result.value = newGen;
};
defineOptions({
  name: 'PasswordPage'
});
</script>
