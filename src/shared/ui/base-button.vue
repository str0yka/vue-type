<template>
  <button class="button">
    <slot
      name="icon"
      :class="$style.icon"
    />
    <slot />
  </button>
</template>

<style lang="css" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  color: var(--color-secondary);
  transition: color 200ms ease;

  &:hover {
    color: var(--color-text);
  }
}
</style>

<style lang="css" module>
.icon {
  width: 20px;
  height: 20px;
}
</style>
