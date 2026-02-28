<template>
  <q-page class="q-pa-md page-container">
    <AnimatedCard title="Number Generator" :delay="0">
      <div class="form-content">
        <AnimatedInput
          v-model="minNum"
          type="number"
          label="Minimum Number"
          icon="mdi-numeric-1-box"
        />

        <AnimatedInput
          v-model="maxNum"
          type="number"
          label="Maximum Number"
          icon="mdi-numeric-9-box"
        />

        <AnimatedButton
          label="Generate Number"
          @click="generate"
          variant="accent"
        />

        <div class="result-container">
          <AnimatedInput
            v-model="result"
            label="Generated Number"
            type="textarea"
            readonly
            icon="mdi-counter"
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

.result-container {
  margin-top: var(--spacing-md);
}
</style>
