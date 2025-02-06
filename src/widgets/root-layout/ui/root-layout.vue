<template>
  <div class="container">
    <header class="header">
      <h1>vue-type</h1>
    </header>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style lang="css"></style>

<style lang="css" scoped>
.container {
  --header-height: 60px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  height: var(--header-height);
  font-weight: 500;
  color: var(--color-text);
  user-select: none;
  font-size: 14px;
}

.main {
  padding-left: 16px;
  padding-right: 16px;
}
</style>
