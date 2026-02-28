<template>
  <q-page class="q-pa-md page-container">
    <AnimatedCard title="Hash Generator" :delay="0">
      <div class="form-content">
        <div class="select-wrapper">
          <label class="select-label">Hash Algorithm</label>
          <select v-model="model" class="custom-select">
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <AnimatedInput
          v-model="dataText"
          label="Input Text"
          type="textarea"
          icon="mdi-text"
          placeholder="Enter text to hash..."
        />

        <AnimatedButton
          label="Generate Hash"
          @click="generate"
          variant="secondary"
        />

        <div class="result-container">
          <AnimatedInput
            v-model="result"
            label="Generated Hash"
            type="textarea"
            readonly
            icon="mdi-lock"
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
import { ref } from 'vue';
import { useGeneralStore } from '../stores/general';
import AnimatedCard from '../components/AnimatedCard.vue';
import AnimatedInput from '../components/AnimatedInput.vue';
import AnimatedButton from '../components/AnimatedButton.vue';
import CopyButton from '../components/CopyButton.vue';

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
