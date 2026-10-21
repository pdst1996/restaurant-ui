<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import LocaleSelector from '@/components/LocaleSelector.vue'
import { useAuth } from '@/composables/useAuth'
import APICallsProvider from '@/common/APICallsProvider'
import type { LoginRequest, LoginResponse } from '../api/types'


const router = useRouter()
const route = useRoute()
const username = ref('')
const password = ref('')
const { login } = useAuth()
const canSubmit = computed(() => username.value.trim() !== '' && password.value !== '')
const { t } = useI18n()

async function handleLogin() {
  const loginRequest: LoginRequest = { user: username.value, password: password.value }
  const data: LoginResponse | null = await APICallsProvider.login(loginRequest);
  if (data?.token !== undefined) {
    login(data?.token || "")
    router.push((route.query.redirect as string) || '/')
  }
}

</script>

<template>
  <main class="login-page">
    <section class="brand-panel">
      <div class="line line-one" aria-hidden="true"></div>
      <div class="line line-two" aria-hidden="true"></div>
      <div class="brand-content">
        <div class="brand-symbol" aria-hidden="true">
          <img src="/images/ps_rest_logo.jpeg" class="brand-logo">
        </div>
        <h1>{{ t('app.name') }}<br /></h1>

        <div class="brand-location">
          <p class="brand-office">{{ t('common.office') }}: {{ t('app.office') }}</p>
          <p>{{ t('app.address') }}</p>
          <p class="brand-description">{{ t('app.description') }}</p>
        </div>

      </div>
      <small>{{ t('app.copyright') }}</small>
    </section>

    <section class="form-panel">
      <div class="form-wrapper">
        <p class="wordmark" aria-label="PS Masterpage">{{ t('app.name') }}</p>

        <div class="form-heading">
          <h2>{{ t('app.welcome') }}</h2>
          <p>{{ t('app.enterData') }}</p>
        </div>

        <el-form class="login-form" label-position="top" @submit.prevent="handleLogin">
          <el-form-item :label="t('common.username')">
            <el-input v-model="username" :placeholder="t('login.usernamePlaceholder')" autocomplete="off"
              :prefix-icon="User" />
          </el-form-item>

          <el-form-item :label="t('common.password')">
            <el-input v-model="password" type="password" :placeholder="t('login.passwordPlaceholder')"
              autocomplete="off" :prefix-icon="Lock" show-password />
          </el-form-item>

          <el-button class="login-button" native-type="submit" :disabled="!canSubmit">
            {{ t('login.submit') }}
          </el-button>
        </el-form>

        <p class="secure-message">{{ t('login.secureMessage') }}
          &nbsp;
          <LocaleSelector />
        </p>

      </div>
    </section>
  </main>
</template>

<style scoped>
/* =========================================================
   RESTAURANT LOGIN
   Palette:
   Terracotta  #D9784A
   Peach       #E9A06F
   Cream       #FFF8EF
   Espresso    #3B2720
   Brown       #765548
   ========================================================= */

.login-page {
  display: grid;
  min-height: 100vh;
  grid-template-columns: minmax(420px, 3fr) minmax(380px, 2fr);
  background: var(--app-login-page-bg);
}

/* =========================================================
   BRAND PANEL
   ========================================================= */

.brand-panel {
  position: relative;
  display: flex;
  min-height: 100vh;
  padding: clamp(42px, 7vw, 96px);
  overflow: hidden;
  color: var(--app-login-brand-ink);
  flex-direction: column;
  justify-content: center;

  background:
    radial-gradient(circle at 85% 15%,
      rgb(255 202 153 / 28%) 0,
      transparent 32%),
    var(--app-login-gradient);
}

/* Decorative organic shape */
.brand-panel::before {
  position: absolute;
  top: -18%;
  right: -15%;
  width: 70%;
  aspect-ratio: 1;
  border-radius: 47% 53% 65% 35%;
  background: var(--app-login-gradient-soft);
  transform: rotate(18deg);
  content: '';
}

/* Second decorative shape */
.brand-panel::after {
  position: absolute;
  bottom: -25%;
  left: -15%;
  width: 55%;
  aspect-ratio: 1;
  border-radius: 62% 38% 40% 60%;
  background: rgb(113 63 43 / 15%);
  transform: rotate(-25deg);
  content: '';
}

/* Organic lines */
.line {
  position: absolute;
  width: 75%;
  aspect-ratio: 1;
  border: 1px solid var(--app-login-lines);
  border-radius: 28% 72% 54% 46%;
}

.line-one {
  top: 8%;
  left: 18%;
  transform: rotate(-24deg);
}

.line-two {
  top: 20%;
  left: 28%;
  transform: rotate(-12deg);
}

/* =========================================================
   BRAND CONTENT
   ========================================================= */

.brand-content {
  position: relative;
  z-index: 2;
  max-width: 540px;
}

.brand-location {
  max-width: 460px;
  margin-top: clamp(26px, 5vh, 50px);
  color: var(--app-login-description);
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  line-height: 1.6;
}

.brand-office {
  margin-top: clamp(26px, 5vh, 50px);
  font-size: clamp(1rem, 1.5vw, 3rem);
  font-style: bold;
}

.brand-description {
  margin-top: clamp(26px, 5vh, 50px);
}

.brand-logo {
  display: flex;
  width: 30%;
  height: 30%;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
  border: 1px solid rgb(255 248 239 / 30%);
  border-radius: 24px;
  background: rgb(255 248 239 / 13%);
  box-shadow: 0 15px 40px rgb(75 35 23 / 15%);
  font-size: 2.8rem;
  backdrop-filter: blur(8px);
}

.brand-content h1 {
  margin: 0;
  color: var(--app-login-brand-ink);
  font-size: clamp(2.7rem, 6vw, 5.3rem);
  font-weight: 750;
  letter-spacing: -0.045em;
  line-height: 1.02;
}

.brand-content h1 span {
  display: inline-block;
  margin-left: 5px;
  font-size: 0.65em;
  transform: rotate(-8deg);
}

.brand-panel small {
  position: absolute;
  bottom: 32px;
  left: clamp(42px, 7vw, 96px);
  z-index: 2;
  color: var(--app-login-copy);
  font-size: 0.75rem;
}

/* =========================================================
   FORM PANEL
   ========================================================= */

.form-panel {
  display: grid;
  min-height: 100vh;
  padding: clamp(32px, 7vw, 90px);
  place-items: center;

  background: var(--app-login-panel-bg);

  box-shadow: inset 1px 0 0 var(--app-login-border);
}

.form-wrapper {
  width: min(100%, 390px);
}

/* Restaurant wordmark */
.wordmark {
  display: inline-block;
  padding: 0;
  color: var(--app-login-ink);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.wordmark:hover {
  color: var(--app-login-accent);
  background: transparent;
}

/* =========================================================
   HEADING
   ========================================================= */

.form-heading {
  margin: clamp(70px, 12vh, 125px) 0 38px;
}

.form-heading h2 {
  margin: 0;
  color: var(--app-login-ink);
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  font-weight: 750;
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.form-heading p {
  margin-top: 10px;
  color: var(--app-login-muted);
  font-size: 0.9rem;
}

/* =========================================================
   FORM
   ========================================================= */

.login-form :deep(.el-form-item) {
  margin-bottom: 25px;
}

.login-form :deep(.el-form-item__label) {
  color: var(--app-login-ink);
  font-weight: 600;
}

/* Inputs */
.login-form :deep(.el-input__wrapper) {
  min-height: 44px;
  padding: 5px 12px;

  border: 1px solid var(--app-login-border);
  border-radius: 10px;

  background: var(--app-login-control-bg);

  box-shadow: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.login-form :deep(.el-input__wrapper:hover) {
  border-color: var(--app-login-accent);
}

.login-form :deep(.el-input__wrapper.is-focus) {
  border-color: var(--app-login-accent);
  background: var(--app-login-control-focus-bg);
  box-shadow: 0 0 0 3px var(--app-login-focus-ring);
}

.login-button {
  width: 100%;
  min-height: 46px;
  margin-top: 5px;
  border: 0;
  border-radius: 10px;
  color: #fff8ef;
  background: var(--app-login-accent);
  box-shadow: 0 10px 18px rgb(84 45 29 / 20%);
  font-weight: 700;
}

.login-button:hover,
.login-button:focus-visible {
  color: #fff8ef;
  background: var(--app-login-accent-hover);
}

.login-button.is-disabled,
.login-button.is-disabled:hover {
  color: rgb(255 248 239 / 72%);
  background: #dba083;
  box-shadow: none;
}

.secure-message {
  display: flex;
  margin-top: 28px;
  align-items: center;
  color: var(--app-login-muted);
  font-size: 0.8rem;
}

/* Tablets and phones: the form occupies the entire available screen. */
@media (max-width: 1024px) {
  .login-page {
    display: block;
  }

  .brand-panel {
    display: none;
  }

  .form-panel {
    min-height: 100dvh;
    padding: clamp(32px, 9vw, 72px);
    box-shadow: none;
  }

  .form-wrapper {
    width: min(100%, 420px);
  }

  .form-heading {
    margin-top: clamp(56px, 12vh, 96px);
  }
}

@media (max-width: 480px) {
  .form-panel {
    padding: 28px 24px;
    place-items: start center;
  }

  .form-heading {
    margin: clamp(52px, 10vh, 76px) 0 32px;
  }

  .form-heading h2 {
    font-size: 1.75rem;
  }
}
</style>
