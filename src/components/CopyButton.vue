<template>
  <button
    class="copy-button"
    :class="{ 'is-copied': isCopied }"
    @click="handleCopy"
    :title="isCopied ? 'Copied!' : 'Copy to clipboard'"
  >
    <transition name="icon-transition" mode="out-in">
      <q-icon v-if="isCopied" key="check" name="mdi-check" class="icon-check" />
      <q-icon v-else key="clipboard" name="mdi-clipboard-multiple-outline" class="icon-clipboard" />
    </transition>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'CopyButton'
});

interface Props {
  text: string;
}

const props = defineProps<Props>();

const isCopied = ref(false);

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.text);
    isCopied.value = true;
    
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};
</script>

<style scoped>
.copy-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
  color: var(--color-gray-600);
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.copy-button:hover {
  background: rgba(102, 126, 234, 0.1);
  color: var(--color-primary);
  transform: scale(1.1);
}

.copy-button.is-copied {
  color: var(--color-success);
  animation: bounce 0.5s ease-out;
}

.icon-check,
.icon-clipboard {
  display: block;
}

.icon-transition-enter-active,
.icon-transition-leave-active {
  transition: all 0.2s ease;
}

.icon-transition-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(-180deg);
}

.icon-transition-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style>
