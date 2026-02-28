<template>
    <q-page class="q-pa-md page-container">
      <q-card flat bordered class="col b-card">
        <q-card-section class="q-gutter-md text-center title-section">
          <div class="text-h5 text-bold page-title">Hash Generator</div>
          <div class="title-decoration"></div>
        </q-card-section>
        <q-separator inset class="custom-separator" />
        <q-card-section class="q-gutter-md form-section">

          <div class="result-wrapper initial" :class="{ 'has-result': result }">
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

          <div class="select-wrapper">
            <q-select
              filled
              v-model="model"
              :options="options"
              label="Select Hash"
              class="custom-select"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-key-variant" class="select-icon" />
              </template>
            </q-select>
          </div>

          <div class="input-wrapper">
            <q-input
              filled
              v-model="dataText"
              label="Text"
              type="textarea"
              class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-text" class="input-icon" />
              </template>
            </q-input>
          </div>

          <div class="button-wrapper">
            <q-btn
              label="Generate"
              type="submit"
              color="primary"
              class="full-width generate-btn"
              @click="generate()"
            >
              <q-icon name="mdi-hash" class="btn-icon" />
            </q-btn>
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

.result-wrapper {
  margin: 0 16px;
  animation: fadeInUp 0.5s ease-out 0.2s forwards;
  opacity: 0;
  transition: all 0.4s ease;
}

.result-wrapper.has-result {
  opacity: 1;
  animation: resultReveal 0.5s ease-out;
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
  min-height: 80px;
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

.select-wrapper {
  margin: 20px 16px;
  animation: fadeInUp 0.5s ease-out 0.3s forwards;
  opacity: 0;
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
  margin: 20px 16px;
  animation: fadeInUp 0.5s ease-out 0.4s forwards;
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

.button-wrapper {
  margin: 24px 16px;
  animation: fadeInUp 0.5s ease-out 0.5s forwards;
  opacity: 0;
}

.generate-btn {
  height: 56px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 16px;
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.generate-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.generate-btn:hover::before {
  left: 100%;
}

.generate-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 30px rgba(26, 35, 126, 0.35);
}

.generate-btn:active {
  transform: translateY(0) scale(0.98);
}

.btn-icon {
  margin-left: 8px;
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
