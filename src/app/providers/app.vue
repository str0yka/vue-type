<script setup lang="ts">
import { RouterView } from 'vue-router';

import { RootLayout } from '@widgets/root-layout';
</script>

<template>
  <root-layout>
    <router-view />
  </root-layout>
</template>
