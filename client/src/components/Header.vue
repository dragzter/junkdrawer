<template>
  <Disclosure as="nav" class="bg-slate-50" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto lg:hidden"
              src="../assets/images/logo-dark.png"
              alt="Your Company"
            />
            <img
              class="hidden h-8 w-auto lg:block"
              src="../assets/images/logo-dark.png"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <template v-for="item in navigation">
                <button
                  v-if="item.visible"
                  :key="item.name"
                  @click="setCurrent(item)"
                  :class="[
                    item.current
                      ? 'bg-slate-200  text-black'
                      : 'text-slate-600 hover:bg-slate-400 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  {{ item.name }}
                </button>
              </template>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <ProfileDropdown />
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProfileDropdown from './ProfileDropdown.vue'
import { Disclosure, DisclosureButton } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { computed, reactive } from 'vue'

interface NavItem {
  name: string
  nav: string
  current: boolean
  visible: boolean
}

const router = useRouter()
const thisPath = computed(() => router.currentRoute.value.path)

const navigation = reactive([
  { name: 'Home', nav: '/', current: thisPath.value === '/', visible: true },
  { name: 'Gallery', nav: '/gallery', current: thisPath.value === '/gallery', visible: true },
  { name: 'Top 5 Junk Drawers', nav: '/top', current: thisPath.value === '/top', visible: true }
]) as NavItem[]

const setCurrent = (item: NavItem) => {
  item.current = true
  const others = navigation.filter((itm) => itm.name !== item.name)
  others.forEach((itm) => (itm.current = false))

  router.push(item.nav)
}
</script>
