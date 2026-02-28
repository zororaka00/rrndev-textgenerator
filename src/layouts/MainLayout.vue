<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="animated-header">
      <q-toolbar class="toolbar-content">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="menu-button"
        />

        <q-toolbar-title class="app-title">
          <span class="title-text">Text Generator</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="custom-drawer"
    >
      <div class="drawer-header">
        <h3 class="drawer-title">Menu</h3>
      </div>
      
      <div class="drawer-content">
        <EssentialLink
          v-for="(link, index) in linksList"
          :key="link.title"
          v-bind="link"
          :style="{ animationDelay: `${index * 50}ms` }"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout'
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Password',
    caption: 'Password Generator',
    icon: 'mdi-lock',
    link: '/#/'
  },
  {
    title: 'Number',
    caption: 'Number Generator',
    icon: 'mdi-counter',
    link: '/#/number'
  },
  {
    title: 'Hash',
    caption: 'Hash Generator',
    icon: 'mdi-lock',
    link: '/#/hash'
  },
  {
    title: 'Text Styler',
    caption: 'Text Styler Generator',
    icon: 'mdi-text-shadow',
    link: '/#/styler'
  },
  {
    title: 'Ethereum Wallet',
    caption: 'Ethereum Wallet Generator',
    icon: 'mdi-ethereum',
    link: '/#/wallet'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.animated-header {
  background: var(--gradient-primary);
  box-shadow: var(--shadow-lg);
  animation: slideDown 0.5s ease-out;
}

.toolbar-content {
  position: relative;
  overflow: hidden;
}

.toolbar-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 3s infinite;
}

.menu-button {
  transition: all var(--transition-base);
}

.menu-button:hover {
  transform: rotate(90deg);
}

.app-title {
  text-align: center;
}

.title-text {
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  animation: fadeIn 0.8s ease-out;
}

.custom-drawer {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(102, 126, 234, 0.2);
}

.drawer-header {
  padding: var(--spacing-xl) var(--spacing-lg);
  background: var(--gradient-primary);
  color: white;
  animation: slideDown 0.4s ease-out;
}

.drawer-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.drawer-content {
  padding: var(--spacing-md) 0;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
