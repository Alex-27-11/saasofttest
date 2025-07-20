<script setup lang="ts">
import AccountForm from './components/AccountForm.vue'
</script>

<template>
  <AccountForm :accountTypes="['LDAP', 'Local']" />
</template>

<style scoped>

</style>
