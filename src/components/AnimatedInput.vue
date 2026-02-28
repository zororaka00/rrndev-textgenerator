<template>
  <div class="animated-input-wrapper">
    <label v-if="label" class="input-label" :class="{ 'label-float': isFocused || modelValue }">
      {{ label }}
    </label>
    <div class="input-container" :class="{ 'input-focused': isFocused, 'input-readonly': readonly }">
      <div v-if="icon" class="input-icon">
        <q-icon :name="icon" />
      </div>
      <textarea
        v-if="type === 'textarea'"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :placeholder="placeholder"
        :readonly="readonly"
        class="input-field input-textarea"
        rows="4"
      ></textarea>
      <input
        v-else
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :placeholder="placeholder"
        :readonly="readonly"
        class="input-field"
      />
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'AnimatedInput'
});

interface Props {
  modelValue: string | number;
  label?: string;
  type?: string;
  readonly?: boolean;
  icon?: string;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  label: '',
  type: 'text',
  readonly: false,
  icon: '',
  placeholder: ''
});

defineEmits<{
  'update:modelValue': [value: string | number]
}>();

const isFocused = ref(false);
</script>

<style scoped>
.animated-input-wrapper {
  position: relative;
  margin-bottom: var(--spacing-md);
  animation: slideUp 0.4s ease-out backwards;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-sm);
  transition: all var(--transition-base);
}

.label-float {
  color: var(--color-primary);
  transform: translateY(-2px);
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  transition: all var(--transition-base);
  overflow: hidden;
}

.input-container::before {
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

.input-focused {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}

.input-focused::before {
  opacity: 0.05;
}

.input-readonly {
  background: rgba(243, 244, 246, 0.9);
  cursor: not-allowed;
}

.input-icon {
  margin-right: var(--spacing-sm);
  color: var(--color-gray-500);
  font-size: 1.25rem;
  transition: all var(--transition-base);
  z-index: 1;
}

.input-focused .input-icon {
  color: var(--color-primary);
  animation: pulse 1s ease-in-out;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--color-gray-900);
  font-family: inherit;
  z-index: 1;
  position: relative;
}

.input-field::placeholder {
  color: var(--color-gray-400);
}

.input-textarea {
  resize: vertical;
  min-height: 100px;
  padding: var(--spacing-sm) 0;
}

.input-field:read-only {
  cursor: not-allowed;
}
</style>
