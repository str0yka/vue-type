import { computed, reactive, ref } from 'vue';

import type { Word } from '@shared/config';

export const useInteractiveWords = (words: Word[]) => {
  const inputtedWords = reactive(words.map(({ id }) => ({ id, value: '' })));
  const currentWordIndex = ref(0);
  const currentLetterIndex = computed(() => inputtedWords[currentWordIndex.value].value.length);

  const currentWord = computed(() => words[currentWordIndex.value].value);
  const inputtedWord = computed({
    get() {
      return inputtedWords[currentWordIndex.value].value;
    },
    set(value) {
      inputtedWords[currentWordIndex.value].value = value;
    }
  });

  const canMoveToNextWord = computed(() => !!inputtedWord.value);

  const deleteLetter = () => {
    inputtedWord.value = inputtedWord.value.slice(0, -1);
  };

  const inputLetter = (letter: string) => {
    inputtedWord.value += letter;
  };

  const moveToNextWord = () => {
    currentWordIndex.value++;
  };

  return {
    currentWord,
    inputtedWord,
    inputtedWords,
    currentWordIndex,
    currentLetterIndex,
    canMoveToNextWord,
    moveToNextWord,
    deleteLetter,
    inputLetter
  };
};
