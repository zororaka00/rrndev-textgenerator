<template>
  <q-item
    clickable
    tag="a"
    :href="link"
    class="link-item"
  >
    <q-item-section
      v-if="icon"
      avatar
      class="link-icon-section"
    >
      <q-icon :name="icon" class="link-icon" />
    </q-item-section>

    <q-item-section class="link-content">
      <q-item-label class="link-title">{{ title }}</q-item-label>
      <q-item-label caption class="link-caption">{{ caption }}</q-item-label>
    </q-item-section>
    
    <q-item-section side class="link-arrow">
      <q-icon name="mdi-chevron-right" class="arrow-icon" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EssentialLink'
});

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
};

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>

<style scoped>
.link-item {
  border-radius: 12px;
  padding: 12px 16px;
  margin: 4px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.link-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(26, 35, 126, 0.08) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.link-item:hover::before {
  opacity: 1;
}

.link-item:hover {
  transform: translateX(8px);
  background: rgba(26, 35, 126, 0.06);
  box-shadow: 0 4px 15px rgba(26, 35, 126, 0.1);
}

.link-icon-section {
  min-width: 48px;
}

.link-icon {
  color: #1a237e;
  font-size: 24px;
  transition: all 0.3s ease;
}

.link-item:hover .link-icon {
  transform: scale(1.2) rotate(5deg);
  color: #5c6bc0;
}

.link-content {
  padding: 4px 8px;
}

.link-title {
  font-weight: 600;
  font-size: 1rem;
  color: #1a237e;
  transition: color 0.3s ease;
}

.link-item:hover .link-title {
  color: #3949ab;
}

.link-caption {
  font-size: 0.8rem;
  color: #5c6bc0;
  margin-top: 2px;
}

.link-arrow {
  opacity: 0;
  transition: all 0.3s ease;
}

.link-item:hover .link-arrow {
  opacity: 1;
}

.arrow-icon {
  color: #1a237e;
  font-size: 20px;
}

.link-item:hover .arrow-icon {
  transform: translateX(4px);
  animation: arrowPulse 1s ease-in-out infinite;
}

@keyframes arrowPulse {
  0%, 100% {
    transform: translateX(4px);
  }
  50% {
    transform: translateX(8px);
  }
}
</style>
