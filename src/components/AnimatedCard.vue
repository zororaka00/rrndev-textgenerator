<template>
  <div 
    class="animated-card"
    :style="{ animationDelay: `${delay}ms` }"
  >
    <div class="card-glow"></div>
    <div class="card-content">
      <div v-if="title || subtitle" class="card-header">
        <h2 v-if="title" class="card-title">{{ title }}</h2>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AnimatedCard'
});

interface Props {
  title?: string;
  subtitle?: string;
  delay?: number;
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  delay: 0
});
</script>

<style scoped>
.animated-card {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  animation: slideUp 0.6s ease-out backwards;
  transition: all var(--transition-base);
}

.animated-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--radius-2xl);
  padding: 2px;
  background: linear-gradient(135deg, 
    var(--color-primary), 
    var(--color-secondary), 
    var(--color-accent)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.animated-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl), var(--shadow-glow);
}

.animated-card:hover::before {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity var(--transition-slow);
  pointer-events: none;
}

.animated-card:hover .card-glow {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-header {
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 var(--spacing-sm) 0;
  animation: slideDown 0.5s ease-out;
}

.card-subtitle {
  font-size: 1rem;
  color: var(--color-gray-600);
  margin: 0;
  animation: fadeIn 0.7s ease-out;
}
</style>
