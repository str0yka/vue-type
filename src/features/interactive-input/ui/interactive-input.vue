<script setup lang="ts">
import { ref } from 'vue';

import { WORDS } from '@shared/config';

import { useInteractiveWords } from '../model';

import InteractiveLetter from './interactive-letter.vue';
import InteractiveWord from './interactive-word.vue';

const itemsRef = ref<HTMLDivElement | null>(null);

const {
  deleteLetter,
  inputLetter,
  currentLetterIndex,
  currentWordIndex,
  canMoveToNextWord,
  moveToNextWord,
  inputtedWord,
  currentWord,
  inputtedWords
} = useInteractiveWords(WORDS);

const handleInput = (event: InputEvent) => {
  if (event.inputType === 'deleteContentBackward') deleteLetter();

  if (event.inputType !== 'insertText') return;

  if (event.data === ' ') {
    return (() => {
      if (canMoveToNextWord.value) moveToNextWord();
    })();
  }

  if (inputtedWord.value.length === currentWord.value.length) return;

  if (event.data) inputLetter(event.data);
};
</script>

<template>
  <label class="words">
    <div
      class="caret"
      :style="{
        height: `${(itemsRef?.clientHeight ?? 0) + 2}px`,
        transform: `translate(${inputtedWord.length === currentWord.length ? (itemsRef?.offsetLeft ?? 0) + (itemsRef?.offsetWidth ?? 0) : itemsRef?.offsetLeft}px, ${itemsRef?.offsetTop ?? 0}px)`
      }"
    />
    <input
      class="visually-hidden"
      autofocus
      @input="handleInput($event as InputEvent)"
    />
    <interactive-word
      v-for="(word, wordIndex) in WORDS"
      :key="word.id"
      :word="word.value"
      :inputted="inputtedWords[wordIndex].value"
    >
      <template #letter="{ getLetterVariant }">
        <interactive-letter
          v-for="(letter, letterIndex) in word.value"
          :key="letterIndex"
          :ref="
            (element) => {
              if (wordIndex === currentWordIndex && letterIndex === currentLetterIndex) {
                itemsRef = (element as unknown as { letter: HTMLDivElement }).letter;
              }
            }
          "
          :variant="getLetterVariant(letterIndex)"
        >
          {{ letter }}
        </interactive-letter>
      </template>
    </interactive-word>
  </label>
</template>

<style lang="css" scoped>
.words {
  cursor: default;
  display: inline-flex;
  flex-wrap: wrap;
  height: 156px;
  overflow: hidden;
  user-select: none;
}

.caret {
  position: absolute;
  background-color: var(--color-caret);
  width: 4px;
  border-radius: 2px;
  inset: 0;
  animation: pulse 1000ms cubic-bezier(0.4, 0, 0.6, 1) infinite;
  transition: transform 100ms ease;
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
