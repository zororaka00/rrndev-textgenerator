<template>
  <button
    class="animated-button"
    :class="[
      `variant-${variant}`,
      { 'is-loading': loading, 'is-disabled': disabled }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span class="button-content">
      <span v-if="loading" class="spinner"></span>
      <span v-else class="button-label">{{ label }}</span>
    </span>
    <span class="button-ripple" ref="rippleRef"></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'AnimatedButton'
});

interface Props {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
}

withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  variant: 'primary'
});

const emit = defineEmits<{
  click: [event: MouseEvent]
}>();

const rippleRef = ref<HTMLElement | null>(null);

const handleClick = (event: MouseEvent) => {
  if (rippleRef.value) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    rippleRef.value.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  emit('click', event);
};
</script>

<style scoped>
.animated-button {
  position: relative;
  padding: var(--spacing-md) var(--spacing-xl);
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all var(--transition-base);
  width: 100%;
  min-height: 48px;
  animation: slideUp 0.5s ease-out backwards;
}

.variant-primary {
  background: var(--gradient-primary);
  box-shadow: var(--shadow-md);
}

.variant-secondary {
  background: var(--gradient-secondary);
  box-shadow: var(--shadow-md);
}

.variant-accent {
  background: var(--gradient-accent);
  box-shadow: var(--shadow-md);
}

.animated-button:hover:not(.is-disabled):not(.is-loading) {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl), var(--shadow-glow);
}

.animated-button:active:not(.is-disabled):not(.is-loading) {
  transform: translateY(-1px);
}

.animated-button.is-disabled,
.animated-button.is-loading {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-label {
  display: inline-block;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: rotate 0.8s linear infinite;
}

.button-ripple {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.ripple-effect {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%);
  animation: ripple 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
  }
}
</style>
