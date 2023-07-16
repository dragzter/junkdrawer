<template>
  Login <button @click="login">Login</button> <br />
  Logout <button @click="logOut">Logout</button>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
const { loginWithRedirect, logout } = useAuth0()

const login = () => {
  loginWithRedirect()
}
const logOut = () => {
  logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>
