<script setup lang="ts">
import type { InteractiveLetterVariant } from './interactive-letter.vue';

interface InteractiveWordProps {
  word: string;
  inputted: string;
}

const { word, inputted } = defineProps<InteractiveWordProps>();

const getLetterVariant = (index: number): InteractiveLetterVariant => {
  if (word[index] === inputted[index]) {
    return 'correct';
  }

  if (word[index] && inputted[index] && word[index] !== inputted[index]) {
    return 'incorrect';
  }

  return 'default';
};
</script>

<template>
  <div class="word">
    <slot
      name="letter"
      :get-letter-variant="getLetterVariant"
    />
  </div>
</template>

<style lang="css" scoped>
.word {
  display: inline-flex;
  margin: 8px;
  font-size: 32px;
  color: var(--color-secondary);
  line-height: 36px;
}
</style>
