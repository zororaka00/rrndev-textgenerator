<template>
  <q-page class="q-pa-md page-container">
    <AnimatedCard title="Ethereum Wallet Generator" :delay="0">
      <div class="form-content">
        <div class="tabs-container">
          <button
            class="tab-button"
            :class="{ 'tab-active': tab === 'mnemonic' }"
            @click="switchTab('mnemonic')"
          >
            <i class="mdi mdi-key-chain"></i>
            Mnemonic
          </button>
          <button
            class="tab-button"
            :class="{ 'tab-active': tab === 'pkey' }"
            @click="switchTab('pkey')"
          >
            <i class="mdi mdi-key"></i>
            Private Key
          </button>
        </div>

        <transition name="fade" mode="out-in">
          <div v-if="tab === 'mnemonic'" key="mnemonic" class="tab-content">
            <div class="word-count-selector">
              <label class="selector-label">Mnemonic Word Count</label>
              <div class="word-count-buttons">
                <button
                  class="word-count-btn"
                  :class="{ 'active': wordCount === 12 }"
                  @click="wordCount = 12"
                >
                  12 Words
                </button>
                <button
                  class="word-count-btn"
                  :class="{ 'active': wordCount === 24 }"
                  @click="wordCount = 24"
                >
                  24 Words
                </button>
              </div>
            </div>

            <AnimatedInput
              v-model="mnemonic"
              type="textarea"
              label="Mnemonic Phrase"
              icon="mdi-key-chain"
              readonly
            >
              <template #append>
                <CopyButton :text="mnemonic" />
              </template>
            </AnimatedInput>
          </div>
          <div v-else key="pkey" class="tab-content">
            <AnimatedInput
              v-model="privatekey"
              type="textarea"
              label="Private Key"
              icon="mdi-key"
              readonly
            >
              <template #append>
                <CopyButton :text="privatekey" />
              </template>
            </AnimatedInput>
          </div>
        </transition>

        <AnimatedInput
          v-model="wallet_address"
          type="textarea"
          label="Wallet Address"
          icon="mdi-wallet"
          readonly
        >
          <template #append>
            <CopyButton :text="wallet_address" />
          </template>
        </AnimatedInput>

        <AnimatedButton
          label="Generate Wallet"
          @click="generate"
          variant="primary"
        />
      </div>
    </AnimatedCard>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { generatePrivateKey, privateKeyToAccount, english, generateMnemonic, mnemonicToAccount } from 'viem/accounts';
import { useGeneralStore } from '../stores/general';
import AnimatedCard from '../components/AnimatedCard.vue';
import AnimatedInput from '../components/AnimatedInput.vue';
import AnimatedButton from '../components/AnimatedButton.vue';
import CopyButton from '../components/CopyButton.vue';

const general = useGeneralStore();
const tab = ref('mnemonic');
const wordCount = ref(12);
const mnemonic = ref('');
const privatekey = ref('');
const wallet_address = ref('');

const switchTab = (newTab: string) => {
  tab.value = newTab;
  reset();
};

const reset = () => {
  mnemonic.value = '';
  privatekey.value = '';
  wallet_address.value = '';
};

const generate = () => {
  if (tab.value == 'mnemonic') {
    // Generate mnemonic with specified word count
    // viem's generateMnemonic uses wordlist, strength is (wordCount / 3 * 32) - 1
    // 12 words = 128 bits, 24 words = 256 bits
    const strength = wordCount.value === 12 ? 128 : 256;
    mnemonic.value = generateMnemonic(english, strength);
    wallet_address.value = mnemonicToAccount(mnemonic.value).address;
  } else {
    privatekey.value = generatePrivateKey();
    wallet_address.value = privateKeyToAccount(privatekey.value as `0x${string}`).address;
  }
};

defineOptions({
  name: 'WalletPage'
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

.tabs-container {
  display: flex;
  gap: var(--spacing-sm);
  background: rgba(255, 255, 255, 0.6);
  padding: var(--spacing-xs);
  border-radius: var(--radius-lg);
  animation: slideUp 0.4s ease-out backwards;
}

.tab-button {
  flex: 1;
  padding: var(--spacing-md);
  border: none;
  background: transparent;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-gray-600);
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.tab-button i {
  font-size: 1.25rem;
}

.tab-button:hover {
  background: rgba(102, 126, 234, 0.1);
  color: var(--color-primary);
}

.tab-active {
  background: var(--gradient-primary);
  color: white !important;
  box-shadow: var(--shadow-md);
}

.tab-content {
  animation: fadeIn 0.3s ease-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.word-count-selector {
  animation: slideUp 0.5s ease-out backwards;
  animation-delay: 100ms;
}

.selector-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-sm);
}

.word-count-buttons {
  display: flex;
  gap: var(--spacing-sm);
  background: rgba(255, 255, 255, 0.6);
  padding: var(--spacing-xs);
  border-radius: var(--radius-lg);
}

.word-count-btn {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-gray-200);
  background: white;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-gray-600);
  cursor: pointer;
  transition: all var(--transition-base);
}

.word-count-btn:hover {
  border-color: var(--color-primary);
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.word-count-btn.active {
  background: var(--gradient-primary);
  border-color: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-md);
}

</style>
