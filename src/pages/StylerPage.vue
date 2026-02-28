<template>
  <q-page class="q-pa-md page-container">
    <AnimatedCard title="Text Styler Generator" :delay="0">
      <div class="form-content">
        <div class="select-wrapper">
          <label class="select-label">Text Style</label>
          <select v-model="model" class="custom-select">
            <option v-for="option in options" :key="option.value" :value="option">
              {{ option.label }}
            </option>
          </select>
        </div>

        <AnimatedInput
          v-model="dataText"
          type="textarea"
          label="Input Text"
          icon="mdi-text-shadow"
          placeholder="Enter text to style..."
          @update:model-value="value => result = string_to_unicode_variant(value, (TextStyle as any)[model.value.replaceAll(' ', '')])"
        />

        <div class="result-container">
          <AnimatedInput
            v-model="result"
            label="Styled Text"
            type="textarea"
            readonly
            icon="mdi-format-text"
          >
            <template #append>
              <CopyButton :text="result" />
            </template>
          </AnimatedInput>
        </div>
      </div>
    </AnimatedCard>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGeneralStore } from '../stores/general';
import { string_to_unicode_variant } from 'string-to-unicode-variant';
import AnimatedCard from '../components/AnimatedCard.vue';
import AnimatedInput from '../components/AnimatedInput.vue';
import CopyButton from '../components/CopyButton.vue';

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
  max-width: 800px;
  margin: 0 auto;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.select-wrapper {
  animation: slideUp 0.4s ease-out backwards;
}

.select-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-sm);
}

.custom-select {
  width: 100%;
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  color: var(--color-gray-900);
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: inherit;
}

.custom-select:hover {
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 1);
}

.custom-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}

.result-container {
  margin-top: var(--spacing-md);
}
</style>
