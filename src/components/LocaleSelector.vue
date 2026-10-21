<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/locales'
import { LOCALES } from '@/common/Constants'
import LanguageSolidIcon from '@iconify-vue/clarity/language-solid';

function handleLocaleChange(value: string) {
    setLocale(value as 'es' | 'en')
}

function getAvailableLocales(): any[] | undefined {
    return LOCALES;
}

</script>

<template>
    <el-dropdown trigger="click" @command="handleLocaleChange">
        <el-icon class="locale-select">
            <LanguageSolidIcon height="1em" />

            <!-- opcional: mostrar el locale actual -->
            <!-- <span>{{ currentLocaleLabel }}</span> -->
        </el-icon>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-for="locale in getAvailableLocales()" :key="locale.key" :command="locale.key"
                    :class="{ 'is-active': locale.key === locale }">
                    {{ locale.label }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style scoped>
.locale-select {
    font-size: x-large;
    cursor: pointer;
    font-style: bold;
}
</style>
