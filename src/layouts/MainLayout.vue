<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="main-header">
      <q-toolbar class="toolbar-content">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="menu-btn"
        />

        <q-toolbar-title class="toolbar-title">
          Text Generator
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="main-drawer"
    >
      <div class="drawer-header">
        <q-icon name="mdi-text-box-multiple" size="40px" class="drawer-icon" />
        <span class="drawer-title">Menu</span>
      </div>
      <q-list class="drawer-list">
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          class="drawer-item"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
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
  },
  {
    title: 'Hash',
    caption: 'Hash Generator',
    icon: 'mdi-lock',
    link: '/#/hash'
  },
  {
    title: 'Encryption',
    caption: 'Encryption Generator',
    icon: 'mdi-lock-plus',
    link: '/#/encryption'
  },
  {
    title: 'Decryption',
    caption: 'Decryption Generator',
    icon: 'mdi-lock-open-outline',
    link: '/#/decryption'
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.main-header {
  background: linear-gradient(135deg, #1a237e 0%, #0d1642 100%) !important;
  box-shadow: 0 4px 20px rgba(26, 35, 126, 0.4);
}

.toolbar-content {
  padding: 0 16px;
}

.menu-btn {
  transition: all 0.3s ease;
  border-radius: 12px;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: rotate(90deg);
}

.toolbar-title {
  font-weight: 700;
  letter-spacing: 1px;
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
  }
}

.main-drawer {
  background: linear-gradient(180deg, #eae4db 0%, #ddd5c5 100%) !important;
  border-right: 1px solid rgba(26, 35, 126, 0.1) !important;
}

.drawer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  border-bottom: 2px solid rgba(26, 35, 126, 0.1);
  margin-bottom: 16px;
}

.drawer-icon {
  color: #1a237e;
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.drawer-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a237e;
  letter-spacing: 1px;
}

.drawer-list {
  padding: 8px;
}

.drawer-item {
  margin-bottom: 8px;
  animation: drawerItemSlide 0.4s ease-out forwards;
  opacity: 0;
  transform: translateX(-20px);
}

.drawer-item:nth-child(1) { animation-delay: 0.1s; }
.drawer-item:nth-child(2) { animation-delay: 0.2s; }
.drawer-item:nth-child(3) { animation-delay: 0.3s; }
.drawer-item:nth-child(4) { animation-delay: 0.4s; }
.drawer-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes drawerItemSlide {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
