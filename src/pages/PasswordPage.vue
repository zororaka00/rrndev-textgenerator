<template>
  <q-page class="q-pa-md page-container">
    <AnimatedCard title="Password Generator" :delay="0">
      <div class="form-content">
        <AnimatedInput
          v-model="numLength"
          type="number"
          label="Password Length"
          icon="mdi-ruler"
        />

        <div class="options-group">
          <label class="options-label">Options</label>
          <div class="checkbox-grid">
            <label 
              v-for="(option, index) in options" 
              :key="option.value"
              class="checkbox-item"
              :style="{ animationDelay: `${100 + index * 50}ms` }"
            >
              <input
                type="checkbox"
                :value="option.value"
                v-model="groupOptions"
                class="custom-checkbox"
              />
              <span class="checkbox-label">{{ option.label }}</span>
            </label>
          </div>
        </div>

        <AnimatedButton
          label="Generate Password"
          @click="generate"
          variant="primary"
        />

        <div class="result-container">
          <AnimatedInput
            v-model="result"
            label="Generated Password"
            type="textarea"
            readonly
            icon="mdi-key-variant"
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
import { computed, ref } from 'vue';
import { useGeneralStore } from '../stores/general';
import AnimatedCard from '../components/AnimatedCard.vue';
import AnimatedInput from '../components/AnimatedInput.vue';
import AnimatedButton from '../components/AnimatedButton.vue';
import CopyButton from '../components/CopyButton.vue';

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

.options-group {
  animation: slideUp 0.5s ease-out backwards;
  animation-delay: 150ms;
}

.options-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-md);
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.checkbox-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(255, 255, 255, 0.6);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  animation: slideUp 0.4s ease-out backwards;
}

.checkbox-item:hover {
  border-color: var(--color-primary);
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  margin-right: var(--spacing-sm);
  cursor: pointer;
  accent-color: var(--color-primary);
}

.checkbox-label {
  font-size: 0.95rem;
  color: var(--color-gray-700);
  font-weight: 500;
}

.result-container {
  margin-top: var(--spacing-md);
}
</style>
