<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';

import { WORDS } from '@shared/config';
import { BaseButton, LanguageIcon, RefreshIcon } from '@shared/ui';

import InteractiveLetter from './interactive-letter.vue';
import InteractiveWord from './interactive-word.vue';

const inputtedWords = reactive(WORDS.map(({ id }) => ({ id, value: '' })));
const activeWordIndex = ref(0);
const activeLetterIndex = computed(() => inputtedWords[activeWordIndex.value].value.length);

const itemsRef = ref<HTMLDivElement | null>(null);
watch(itemsRef, () => {
  console.log(itemsRef.value?.offsetLeft);
});

const handleInput = (event: InputEvent) => {
  const word = WORDS[activeWordIndex.value];
  const activeWord = inputtedWords[activeWordIndex.value];

  if (event.inputType === 'deleteContentBackward') {
    activeWord.value = activeWord.value.slice(0, -1);
  }

  if (event.inputType !== 'insertText') {
    return;
  }

  if (event.data === ' ') {
    if (activeWord.value) {
      activeWordIndex.value++;
    }

    return;
  }

  if (activeWord.value.length === word.value.length) {
    return;
  }

  activeWord.value += event.data;
};
</script>

<template>
  <div class="container">
    <base-button ref="test">
      <template #icon="iconProps">
        <language-icon v-bind="iconProps" />
      </template>
      russian
    </base-button>
    <label class="words">
      <div
        class="caret"
        :style="{
          height: `${(itemsRef?.clientHeight ?? 0) + 2}px`,
          transform: `translate(${inputtedWords[activeWordIndex].value.length === WORDS[activeWordIndex].value.length ? (itemsRef?.offsetLeft ?? 0) + (itemsRef?.offsetWidth ?? 0) : itemsRef?.offsetLeft}px, ${itemsRef?.offsetTop ?? 0}px)`
        }"
      ></div>
      <input
        class="visually-hidden"
        @input="handleInput($event as InputEvent)"
        autofocus
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
            :ref="
              (element) => {
                if (wordIndex === activeWordIndex && letterIndex === activeLetterIndex) {
                  console.log(activeWordIndex, activeLetterIndex);
                  itemsRef = (element as unknown as { letter: HTMLDivElement }).letter;
                }
              }
            "
            :key="letterIndex"
            :variant="getLetterVariant(letterIndex)"
          >
            {{ letter }}
          </interactive-letter>
        </template>
      </interactive-word>
    </label>
    <base-button>
      <template #icon="iconProps">
        <refresh-icon v-bind="iconProps" />
      </template>
      refresh
    </base-button>
  </div>
</template>

<style lang="css" scoped>
.container {
  min-height: calc(100vh - var(--header-height));
  display: flex;
  padding-top: 16px;
  align-items: center;
  flex-direction: column;
  gap: 16px;
}

.language-icon {
  width: 16px;
  height: 16px;
}

.words {
  cursor: default;
  display: inline-flex;
  flex-wrap: wrap;
  height: 156px;
  overflow: hidden;
  user-select: none;
}

.input {
  display: none;
}

.caret {
  position: absolute;
  background-color: var(--color-caret);
  width: 4px;
  border-radius: 2px;
  inset: 0;
  /* animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; */
  transition: transform 100ms ease;
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
</style>
