<template>
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton v-if="isAuthenticated" :class="btnGrey800">
        <span class="sr-only">Open user menu</span>
        <img class="h-8 w-8 rounded-full" :src="user.picture" alt="User Avatar" />
      </MenuButton>
      <button v-else @click="login" :class="profileBtn">
        <span class="sr-only">Sign In</span> Sign In
      </button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem v-slot="{ active }">
          <router-link
            v-if="isAuthenticated"
            to="/profile"
            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
            >Your Profile</router-link
          >
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a
            @click="logOut"
            :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
          >
            Sign out
          </a>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/use-login'
import { RouterLink } from 'vue-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { btnGrey800, profileBtn } from '@/helpers/tw-style-presets'

const { isAuthenticated, login, logOut, user } = useAuth()
</script>
