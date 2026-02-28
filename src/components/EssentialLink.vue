<template>
  <a
    :href="link"
    class="essential-link"
    :class="{ 'is-active': isActive }"
  >
    <div class="link-icon" v-if="icon">
      <q-icon :name="icon" />
    </div>

    <div class="link-content">
      <div class="link-title">{{ title }}</div>
      <div class="link-caption" v-if="caption">{{ caption }}</div>
    </div>

    <div class="link-glow"></div>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'EssentialLink'
});

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
};

const props = withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});

const isActive = computed(() => {
  if (typeof window !== 'undefined') {
    return window.location.hash === props.link.replace('/#', '');
  }
  return false;
});
</script>

<style scoped>
.essential-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  margin: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--color-gray-700);
  transition: all var(--transition-base);
  overflow: hidden;
  animation: slideInLeft 0.4s ease-out backwards;
}

.essential-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--transition-base);
  z-index: 0;
}

.essential-link:hover::before {
  opacity: 0.1;
}

.essential-link:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.5);
  box-shadow: var(--shadow-md);
}

.essential-link.is-active {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-lg);
}

.essential-link.is-active::before {
  opacity: 0;
}

.link-icon {
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  margin-right: var(--spacing-md);
  transition: transform var(--transition-base);
}

.essential-link:hover .link-icon {
  animation: bounce 0.6s ease;
}

.link-content {
  position: relative;
  z-index: 1;
  flex: 1;
}

.link-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 2px;
}

.link-caption {
  font-size: 0.75rem;
  opacity: 0.8;
}

.link-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity var(--transition-slow);
  pointer-events: none;
  z-index: 0;
}

.essential-link:hover .link-glow {
  opacity: 1;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
