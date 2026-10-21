<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
    Document,
    HomeFilled,
    Menu as MenuIcon,
    MoonNight,
    Sunny,
    SwitchButton,
} from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { Icon } from '@iconify/vue'
import LocaleSelector from './LocaleSelector.vue'
import Loader from './Loader.vue'
import { isDarkTheme, setThemeMode } from '@/common/theme'


const { logout } = useAuth()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const activeIndex = computed(() => route.path)
const mobileMenuOpen = ref(false)
const isDark = computed({
    get: () => isDarkTheme.value,
    set: (value: boolean) => {
        setThemeMode(value ? 'dark' : 'light')
    },
})

function handleSelect(index: string) {
    if (index.startsWith('/')) {
        router.push(index)
        mobileMenuOpen.value = false
    }
}

function handleLogout() {
    mobileMenuOpen.value = false
    logout()
    router.push({ name: 'login' })
}

</script>

<template>
    <el-header class="navbar">
        <el-row class="navbar-content" :wrap="false">
            <el-space class="brand" :size="10">
                <el-avatar class="brand-mark" :size="38">PS</el-avatar>
                <el-text class="brand-name" size="large">{{ }}</el-text>
            </el-space>

            <el-menu :default-active="activeIndex" class="desktop-menu" mode="horizontal" :ellipsis="false"
                @select="handleSelect">
                <el-menu-item index="/">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                </el-menu-item>
                <el-menu-item index="/orders">
                    <el-icon>
                        <Document />
                    </el-icon>
                    {{ t('menu.orders') }}
                </el-menu-item>
            </el-menu>

            <el-space class="desktop-actions" :size="12">

                <el-switch v-model="isDark" class="theme-switch" inline-prompt :active-icon="MoonNight"
                    :inactive-icon="Sunny" :aria-label="t('theme.switchLabel')"
                    :title="isDark ? t('theme.dark') : t('theme.light')" />
                <locale-selector />
                <el-button type="primary" plain @click="handleLogout">
                    <template #icon>
                        <Icon icon="mdi:logout" width="1em" />
                    </template>
                    {{ t('menu.logout') }}
                </el-button>
                <loader />
            </el-space>

            <el-button class="mobile-toggle" circle aria-label="Abrir menú" @click="mobileMenuOpen = true">
                <el-icon size="20">
                    <MenuIcon />
                </el-icon>
            </el-button>
        </el-row>
    </el-header>

    <el-drawer v-model="mobileMenuOpen" :title="t('app.name')" direction="rtl" size="280px">
        <el-menu :default-active="activeIndex" class="mobile-menu" @select="handleSelect">
            <el-menu-item index="/">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                {{ t('menu.home') }}
            </el-menu-item>
            <el-menu-item index="/orders">
                <el-icon>
                    <Document />
                </el-icon>
                {{ t('menu.orders') }}
            </el-menu-item>
        </el-menu>

        <el-space direction="vertical" fill class="mobile-actions">
            <locale-selector />
            <el-switch v-model="isDark" class="theme-switch theme-switch--mobile" inline-prompt :active-icon="MoonNight"
                :inactive-icon="Sunny" :aria-label="t('theme.switchLabel')"
                :title="isDark ? t('theme.dark') : t('theme.light')" />
            <el-button type="danger" plain @click="handleLogout">
                <el-icon>
                    <SwitchButton />
                </el-icon>
                {{ t('menu.logout') }}
            </el-button>
        </el-space>
    </el-drawer>
</template>

<style scoped>
.navbar {
    padding: 0 0px;
    border-bottom: 1px solid var(--app-border);
    background: var(--app-surface);
    box-shadow: var(--app-nav-shadow);
    backdrop-filter: blur(14px);
}

.navbar-content {
    gap: 28px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 1em 0 1em;
}

.brand {
    flex-shrink: 0;
}

.brand-mark {
    color: #fff;
    font-weight: 700;
    background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-primary-dark-2));
    box-shadow: 0 6px 14px rgb(84 45 29 / 25%);
}

.brand-name {
    color: var(--app-text);
    font-weight: 700;
    letter-spacing: -0.02em;
}

.desktop-menu {
    flex: 1;
    gap: 6px;
    height: 100%;
    border-bottom: 0;
    background: transparent;
}

.desktop-actions {
    flex-shrink: 0;
}

.locale-select {
    width: 120px;
}

.mobile-toggle {
    display: none;
    margin-left: auto;
}

.mobile-menu {
    border-right: 0;
}

.mobile-actions {
    width: 100%;
    margin-top: 24px;
}

.theme-switch {
    --el-switch-on-color: var(--el-color-primary);
    --el-switch-off-color: var(--app-border);
}

.theme-switch--mobile {
    align-self: flex-start;
}

@media (max-width: 768px) {
    .navbar {
        height: 64px;
        padding-inline: 16px;
    }

    .desktop-menu,
    .desktop-actions {
        display: none;
    }

    .mobile-toggle {
        display: inline-flex;
    }
}
</style>
