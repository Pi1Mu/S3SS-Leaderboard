<template>
  <NuxtLoadingIndicator class="z-index: 1000;" :height="2" />
  <v-app>
    <v-app-bar color="background" elevation="0">
      <v-container>
        <div class="d-flex flex-row w-100 h-100 align-center ga-8">
          <p class="th-1 text-primary justify-center">Sub 3 Seed Speedrunning</p>

          <div class="d-flex flex-row ga-2 ml-auto">
            <v-btn variant="outlined" color="primary" prepend-icon="far fa-square-plus">Submittion</v-btn>
            <v-btn v-if="!loggedIn" variant="outlined" color="primary" prepend-icon="fab fa-discord" @click="login">Login</v-btn>
            <v-btn class="justify-baseline" @click="" style="text-transform: none;">
              <v-avatar :image="user?.avatar" size="24" class="mr-2" />
              <span>{{ user?.name }}</span>
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <NuxtPage v-if="!error" />
        <slot v-else></slot>
      </v-container>
    </v-main>
    <v-footer color="background" style="flex-shrink: 1; flex-grow: 0;" app></v-footer>
  </v-app>
</template>

<script lang="ts" setup>
const error = useError()
useSeoMeta({
  title: 'Sub3 Seed Speedrunning'
})

const { loggedIn, user } = useUserSession()

const login = () => {
  window.location.href = '/api/auth'
}
</script>

<style lang="scss" scoped>
</style>