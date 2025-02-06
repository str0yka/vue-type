<script setup lang="ts">
import { useTemplateRef } from 'vue';

export type InteractiveLetterVariant = 'default' | 'correct' | 'incorrect';

interface InteractiveLetterProps {
  variant: InteractiveLetterVariant;
}

const { variant } = defineProps<InteractiveLetterProps>();

const letterRef = useTemplateRef('letter');

defineExpose({ letter: letterRef });
</script>

<template>
  <div
    ref="letter"
    :class="[
      'letter',
      {
        'correct-letter': variant === 'correct',
        'incorrect-letter': variant === 'incorrect'
      }
    ]"
  >
    <slot />
  </div>
</template>

<style lang="css" scoped>
.letter {
  color: var(--color-primary);
}

.correct-letter {
  color: var(--color-text);
}

.incorrect-letter {
  color: var(--color-danger);
}
</style>
