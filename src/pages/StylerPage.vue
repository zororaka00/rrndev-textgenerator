<template>
  <q-page class="q-pa-md page-container">
    <q-card flat bordered class="col b-card">
      <q-card-section class="q-gutter-md text-center title-section">
        <div class="text-h5 text-bold page-title">Text Styler Generator</div>
        <div class="title-decoration"></div>
      </q-card-section>
      <q-separator inset class="custom-separator" />
      <q-card-section class="q-gutter-md form-section">

        <div class="select-wrapper">
          <q-select
            filled
            v-model="model"
            :options="options"
            label="Text Styler Option"
            class="custom-select"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-format-letter-starts-with" class="select-icon" />
            </template>
          </q-select>
        </div>

        <div class="input-wrapper">
          <q-input
            filled
            v-model="dataText"
            type="textarea"
            label="Input text...."
            class="custom-input"
            @update:model-value="value => result = string_to_unicode_variant(value, (TextStyle as any)[model.value?.replaceAll(' ', '')])"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-text-short" class="input-icon" />
            </template>
          </q-input>
        </div>

        <div class="result-wrapper" :class="{ 'has-result': result }">
          <q-input
            filled
            v-model="result"
            label="Result"
            type="textarea"
            readonly
            class="result-input"
          >
            <template v-slot:append>
              <q-icon
                name="mdi-clipboard-multiple-outline"
                @click="general.copyClipboard(result)"
                class="copy-icon"
              />
            </template>
          </q-input>
        </div>
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

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  min-height: calc(100vh - 50px);
}

.b-card {
  max-width: 600px;
  width: 100%;
  background: linear-gradient(145deg, #ffffff 0%, #f5f0e8 100%);
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(26, 35, 126, 0.12);
  border: 1px solid rgba(26, 35, 126, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: cardEntrance 0.6s ease-out forwards;
  overflow: hidden;
}

.b-card:hover {
  box-shadow: 0 16px 50px rgba(26, 35, 126, 0.18);
  transform: translateY(-4px);
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title-section {
  padding-bottom: 20px;
}

.page-title {
  color: #1a237e;
  font-weight: 700;
  font-size: 1.8rem;
  letter-spacing: -0.5px;
  animation: titlePulse 2s ease-in-out infinite;
  margin-bottom: 8px;
}

@keyframes titlePulse {
  0%, 100% {
    text-shadow: 0 0 0 rgba(26, 35, 126, 0);
  }
  50% {
    text-shadow: 0 0 25px rgba(26, 35, 126, 0.25);
  }
}

.title-decoration {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #1a237e, #5c6bc0);
  border-radius: 2px;
  margin: 0 auto;
  animation: decorationExpand 0.8s ease-out 0.4s forwards;
  transform: scaleX(0);
}

@keyframes decorationExpand {
  to {
    transform: scaleX(1);
  }
}

.custom-separator {
  background: linear-gradient(90deg, transparent, rgba(26, 35, 126, 0.15), transparent);
  height: 2px;
}

.form-section {
  padding: 24px 24px;
}

.select-wrapper {
  margin: 0 16px 20px 16px;
  animation: fadeInUp 0.5s ease-out 0.2s forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-select {
  border-radius: 16px;
}

.custom-select :deep(.q-field__control) {
  border-radius: 16px;
  transition: all 0.3s ease;
}

.custom-select :deep(.q-field__control::before) {
  border-bottom: 2px solid rgba(26, 35, 126, 0.15);
}

.custom-select :deep(.q-field__control::after) {
  border-bottom: 2px solid #1a237e;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.custom-select :deep(.q-field--focused .q-field__control::after) {
  transform: scaleX(1);
}

.custom-select :deep(.q-field--focused .q-field__control) {
  background: rgba(26, 35, 126, 0.04);
  box-shadow: 0 4px 20px rgba(26, 35, 126, 0.1);
}

.select-icon {
  color: #1a237e;
  transition: all 0.3s ease;
}

.custom-select:hover .select-icon {
  transform: scale(1.1);
}

.input-wrapper {
  margin: 0 16px 20px 16px;
  animation: fadeInUp 0.5s ease-out 0.3s forwards;
  opacity: 0;
}

.custom-input {
  border-radius: 16px;
}

.custom-input :deep(.q-field__control) {
  border-radius: 16px;
  transition: all 0.3s ease;
}

.custom-input :deep(.q-field__control::before) {
  border-bottom: 2px solid rgba(26, 35, 126, 0.15);
}

.custom-input :deep(.q-field__control::after) {
  border-bottom: 2px solid #1a237e;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.custom-input :deep(.q-field--focused .q-field__control::after) {
  transform: scaleX(1);
}

.custom-input :deep(.q-field--focused .q-field__control) {
  background: rgba(26, 35, 126, 0.04);
  box-shadow: 0 4px 20px rgba(26, 35, 126, 0.1);
}

.input-icon {
  color: #1a237e;
  transition: all 0.3s ease;
}

.custom-input:hover .input-icon {
  transform: scale(1.1);
}

.result-wrapper {
  margin: 0 16px;
  animation: fadeInUp 0.5s ease-out 0.4s forwards;
  opacity: 0;
  transition: all 0.4s ease;
}

.result-wrapper.has-result {
  opacity: 1;
  animation: resultReveal 0.5s ease-out;
}

@keyframes resultReveal {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.result-input {
  border-radius: 16px;
}

.result-input :deep(.q-field__control) {
  border-radius: 16px;
  background: rgba(26, 35, 126, 0.03);
  min-height: 100px;
  transition: all 0.3s ease;
}

.result-input :deep(.q-field__control:hover) {
  background: rgba(26, 35, 126, 0.06);
}

.copy-icon {
  color: #3949ab;
  transition: all 0.3s ease;
  cursor: pointer;
}

.copy-icon:hover {
  color: #1a237e;
  transform: scale(1.2) rotate(5deg);
}

@media (max-width: 599px) {
  .b-card {
    margin: 8px;
    border-radius: 20px;
  }

  .page-title {
    font-size: 1.5rem;
  }
}
</style>
