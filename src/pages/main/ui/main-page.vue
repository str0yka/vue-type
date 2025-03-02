<script setup lang="ts">
import { InteractiveInput } from '@features/interactive-input';

import { BaseButton, LanguageIcon, RefreshIcon } from '@shared/ui';
</script>

<template>
  <div class="container">
    <base-button ref="test">
      <template #icon="iconProps">
        <language-icon v-bind="iconProps" />
      </template>
      russian
    </base-button>

    <interactive-input />

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
</style>
