<template>
    <q-page class="q-pa-md">
      <q-card flat bordered class="col b-card">
        <q-card-section class="q-gutter-md text-center">
          <div class="text-h5 text-bold">Ethereum Wallet Generator</div>
        </q-card-section>
        <q-separator inset />
        <q-tabs v-model="tab" dense>
          <q-tab name="mnemonic" label="Mnemonic" @click="reset()" />
          <q-tab name="pkey" label="Private Key" @click="reset()" />
        </q-tabs>
        <q-separator inset />
        <q-card-section class="q-gutter-md">
          <q-input filled type="textarea" v-model="mnemonic" label="Mnemonic" readonly v-if="tab == 'mnemonic'">
            <template v-slot:append>
              <q-icon name="mdi-clipboard-multiple-outline" @click="general.copyClipboard(mnemonic)" />
            </template>
          </q-input>
          <q-input filled v-model="privatekey" label="Private Key" readonly v-else>
            <template v-slot:append>
              <q-icon name="mdi-clipboard-multiple-outline" @click="general.copyClipboard(privatekey)" />
            </template>
          </q-input>

          <q-input filled v-model="wallet_address" label="Wallet Address" readonly >
            <template v-slot:append>
              <q-icon name="mdi-clipboard-multiple-outline" @click="general.copyClipboard(wallet_address)" />
            </template>
          </q-input>
  
          <div class="text-center">
            <q-btn label="Generate" type="submit" color="primary" class="full-width" @click="generate()" />
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
  