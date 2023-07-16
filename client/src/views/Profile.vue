<template>
  <div v-if="isAuthenticated">
    <div class="flex items-center py-7">
      <img :src="USER.picture" class="w-32 rounded-lg shadow-lg" alt="Avatar" />
      <div class="px-4">
        <label>
          <input type="file" :class="inputSlate500" />
        </label>
        <p class="text-sm py-2 text-slate-400 text-center">JPG, GIF or PNG, 1mb Max</p>
      </div>
    </div>
    <hr :class="hr100" />

    <h3 :class="h3Slate700">Details</h3>
    <table class="border-collapse table-auto w-full text-lg">
      <tbody>
        <tr>
          <td :class="tdSlate600">Name</td>
          <td :class="tdSlate500">{{ USER.name }}</td>
          <td :class="tdSlate500">
            <button :class="profileBtn">Edit</button>
          </td>
        </tr>
        <tr>
          <td :class="tdSlate600">Email</td>
          <td :class="tdSlate500">{{ USER.email }}</td>
          <td :class="tdSlate500">
            <button :class="profileBtn">Edit</button>
          </td>
        </tr>
        <tr>
          <td :class="tdSlate600">Email Verified</td>
          <td :class="tdSlate500">
            {{ user.email_verified }}
          </td>
          <td :class="tdSlate500">
            <button :class="profileBtn">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="py-3"></div>
    <hr :class="hr100" />
    <h3 :class="h3Slate700">Upload More Images</h3>

    <label>
      <input type="file" @change="onFileInputChange" multiple :class="inputSlate500" />
    </label>

    <button
      :disabled="uploadDisabled"
      @click="uploadFiles"
      :class="[
        ...profileBtn,
        {
          'cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed': uploadDisabled
        }
      ]"
    >
      Upload Files
    </button>

    <hr :class="hr100" />
    <h3 :class="h3Slate700">Uploaded</h3>
    <img
      src="https://storage.cloud.google.com/junkdrawer_preview_imgs/9042e5af-5170-4f47-b721-3dcd87c93b73"
      alt=""
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useUserStore } from '../stores/user'
import type { IUser } from './types'
import { onMounted, watch, ref, computed, reactive } from 'vue'
import axios from 'axios'
import {
  tdSlate500,
  tdSlate600,
  profileBtn,
  hr100,
  inputSlate500,
  h3Slate700
} from '@/helpers/tw-style-presets'

const { user, isAuthenticated } = useAuth0()
const router = useRouter()
const userIsAuthenticated = ref(isAuthenticated.value)
const userStore = useUserStore()
const fileInputRef = ref<HTMLInputElement | null>(null)
const files = ref<File[]>([])
const USER = ref<IUser>({} as IUser)
const uploadDisabled = computed(() => (files.value.length > 0 ? false : true))

const uploadFiles = async () => {
  const formData = new FormData()
  formData.append('file', files.value[0])
  formData.append('id', USER.value.id as string)

  await userStore.uploadFile(formData)
}

const onFileInputChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    files.value = Array.from(input.files)
  }
}

userIsAuthenticated.value = isAuthenticated.value

// Life cycle
onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push({ path: '/' })
  }

  if (user.value?.sub) {
    await userStore.loadUser(user.value?.sub as string)
    if (!Object.keys(userStore.user)?.length) {
      // First time login
      USER.value = {
        name: user.value.name as string,
        id: user.value.sub as string,
        picture: user.value.picture as string,
        email: user.value.email as string,
        nickname: user.value.nickname as string,
        email_verified: user.value.email_verified,
        junkdrawer_images: {}
      }

      await userStore.saveUser(USER.value)
    } else {
      USER.value = userStore.user as IUser
    }
  }
})
</script>
