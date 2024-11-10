<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="col b-card">
      <q-card-section class="q-gutter-md text-center">
        <div class="text-h5 text-bold">Text Styler Generator</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="q-gutter-md">
        <q-select filled v-model="model" :options="options" label="Text Styler Option" />

        <q-input filled v-model="dataText" type="textarea" label="Input text...."
        @update:model-value="value => result = string_to_unicode_variant(value, (TextStyle as any)[model.value.replaceAll(' ', '')])" />

        <q-input filled v-model="result" label="Result" type="textarea" readonly >
          <template v-slot:append>
            <q-icon name="mdi-clipboard-multiple-outline" @click="general.copyClipboard(result)" />
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useGeneralStore } from '../stores/general';
import { string_to_unicode_variant } from 'string-to-unicode-variant';

const general = useGeneralStore();
const result = ref('');
const dataText = ref('');
const model: any = ref(null);
const options: any = ref([]);

enum TextStyle {
  Monospace = 'm',
  Bold = 'b',
  Italic = 'i',
  BoldItalic = 'bi',
  Script = 'c',
  BoldScript = 'bc',
  Gothic = 'g',
  GothicBold = 'bg',
  DoubleStruck = 'd',
  Sans = 's',
  BoldSans = 'bs',
  ItalicSans = 'is',
  BoldItalicSans = 'bis',
  Circled = 'o',
  CircledNegative = 'on',
  Squared = 'q',
  SquaredNegative = 'qn',
  Parenthesis = 'p',
  Fullwidth = 'w',
  Flags = 'f',
  NumbersDot = 'nd',
  NumbersComma = 'nc',
  NumberDoubleCircled = 'ndc',
}

onMounted(() => {
  const textStyleKeys = Object.keys(TextStyle).filter((key) => isNaN(Number(key))) as Array<keyof typeof TextStyle>;
  options.value = textStyleKeys.map(data => ({
    label: string_to_unicode_variant(data.replace(/(?!^)([A-Z])/g, ' $1'), TextStyle[data]),
    value: data
  }));
  model.value = options.value[0];
});

defineOptions({
  name: 'StylerPage'
});
</script>
