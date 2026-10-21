<script setup lang="ts">
import Menu from '@/components/Menu.vue'
</script>

<template>
  <el-container class="main-layout">
    <header class="main-header">
      <Menu />
    </header>

    <el-main class="main-content">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.main-layout {
  flex-direction: column;
  min-height: 100vh;
}

.main-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
}

.main-content {
  width: 100%;
  margin: 0 auto;
  padding: 70px 24px 32px;
  color: var(--app-text);
}

.content-card {
  min-height: calc(100vh - 136px);
  background: var(--app-surface-strong);
  border: 1px solid var(--app-border);
  border-radius: 18px;
  box-shadow: var(--app-shadow);
}

@media (max-width: 768px) {
  .main-content {
    padding: 80px 12px 16px;
  }

  .content-card {
    min-height: calc(100vh - 96px);
    border-radius: 14px;
  }
}
</style>
