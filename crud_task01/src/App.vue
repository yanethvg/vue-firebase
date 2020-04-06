<template>
  <div id="app" class="container">
    <div class="mt-5 text-center">
      <router-link :to="{name: 'Inicio'}" >
        <img src="@/assets/logo.png" alt="" >
      </router-link>
    </div>
    <router-view/>
  </div>
</template>


