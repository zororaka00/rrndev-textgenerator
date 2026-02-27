<template>
    <q-page class="q-pa-md page-container">
      <q-card flat bordered class="col b-card">
        <q-card-section class="q-gutter-md text-center title-section">
          <div class="text-h5 text-bold page-title">Ethereum Wallet Generator</div>
          <div class="title-decoration"></div>
        </q-card-section>
        <q-separator inset class="custom-separator" />
        <q-tabs v-model="tab" dense class="custom-tabs">
          <q-tab name="mnemonic" label="Mnemonic" @click="reset()" class="custom-tab">
            <template v-slot:prepend>
              <q-icon name="mdi-seed" />
            </template>
          </q-tab>
          <q-tab name="pkey" label="Private Key" @click="reset()" class="custom-tab">
            <template v-slot:prepend>
              <q-icon name="mdi-key" />
            </template>
          </q-tab>
        </q-tabs>
        <q-separator inset class="custom-separator" />
        <q-card-section class="q-gutter-md form-section">
          <transition name="tab-fade" mode="out-in">
            <div v-if="tab == 'mnemonic'" key="mnemonic" class="tab-content">
              <div class="input-wrapper">
                <q-input 
                  filled 
                  type="textarea" 
                  v-model="mnemonic" 
                  label="Mnemonic" 
                  readonly 
                  class="result-input"
                >
                  <template v-slot:append>
                    <q-icon 
                      name="mdi-clipboard-multiple-outline" 
                      @click="general.copyClipboard(mnemonic)"
                      class="copy-icon"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            <div v-else key="pkey" class="tab-content">
              <div class="input-wrapper">
                <q-input 
                  filled 
                  v-model="privatekey" 
                  type="textarea" 
                  label="Private Key" 
                  readonly
                  class="result-input"
                >
                  <template v-slot:append>
                    <q-icon 
                      name="mdi-clipboard-multiple-outline" 
                      @click="general.copyClipboard(privatekey)"
                      class="copy-icon"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </transition>

          <div class="wallet-address-wrapper">
            <q-input 
              filled 
              v-model="wallet_address" 
              type="textarea" 
              label="Wallet Address" 
              readonly 
              class="result-input"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-wallet" class="wallet-icon" />
              </template>
              <template v-slot:append>
                <q-icon 
                  name="mdi-clipboard-multiple-outline" 
                  @click="general.copyClipboard(wallet_address)"
                  class="copy-icon"
                />
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
              <q-icon name="mdi-cog-sync" class="btn-icon" />
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </template>

<script setup lang="ts">
import { ref } from 'vue';
import { generatePrivateKey, privateKeyToAccount, english, generateMnemonic, mnemonicToAccount } from 'viem/accounts';

import { useGeneralStore } from '../stores/general';

const general = useGeneralStore();
const tab = ref('mnemonic');
const mnemonic = ref('');
const privatekey = ref('');
const wallet_address = ref('');


const reset = () => {
  mnemonic.value = '';
  privatekey.value = '';
  wallet_address.value = '';
};

const generate = () => {
  if (tab.value == 'mnemonic') {
    mnemonic.value = generateMnemonic(english);
    wallet_address.value = mnemonicToAccount(mnemonic.value).address;
  } else {
    privatekey.value = generatePrivateKey();
    wallet_address.value = privateKeyToAccount(privatekey.value as `0x${string}`).address;
  }
};
defineOptions({
    name: 'NumberPage'
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
  font-size: 1.6rem;
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

.custom-tabs {
  background: rgba(26, 35, 126, 0.03);
  animation: fadeInUp 0.5s ease-out 0.3s forwards;
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

.custom-tab {
  transition: all 0.3s ease;
  position: relative;
}

.custom-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #1a237e, #5c6bc0);
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 3px 3px 0 0;
}

.q-tab--active.custom-tab::after {
  width: 80%;
}

.custom-tab:hover {
  background: rgba(26, 35, 126, 0.08);
}

.q-tab--active.custom-tab {
  color: #1a237e;
  font-weight: 600;
}

.form-section {
  padding-top: 24px;
}

.tab-content {
  animation: tabContentFadeIn 0.4s ease-out;
}

@keyframes tabContentFadeIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.3s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.input-wrapper {
  margin-bottom: 16px;
  animation: fadeInUp 0.5s ease-out 0.4s forwards;
  opacity: 0;
}

.wallet-address-wrapper {
  margin-top: 16px;
  animation: fadeInUp 0.5s ease-out 0.5s forwards;
  opacity: 0;
}

.result-input {
  border-radius: 16px;
}

.result-input :deep(.q-field__control) {
  border-radius: 16px;
  background: rgba(26, 35, 126, 0.03);
  min-height: 70px;
  transition: all 0.3s ease;
}

.result-input :deep(.q-field__control:hover) {
  background: rgba(26, 35, 126, 0.06);
}

.wallet-icon {
  color: #1a237e;
  transition: all 0.3s ease;
}

.result-input:hover .wallet-icon {
  transform: scale(1.1);
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

.button-wrapper {
  margin: 24px 0;
  animation: fadeInUp 0.5s ease-out 0.6s forwards;
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
    font-size: 1.4rem;
  }
}
</style>
