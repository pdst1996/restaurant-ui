<script setup lang="ts">

import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

watch(locale, (newLocale) => {
  console.log('idioma cambiado a:', newLocale)
})

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
