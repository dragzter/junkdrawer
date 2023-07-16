import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/views/types'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const user = ref({})

  const loadUser = async (userId: string) => {
    const userRespose = await axios.get(`http://localhost:3000/user/${userId}`)
    user.value = userRespose.data ? userRespose.data : {}
  }

  const uploadFile = async (formData: FormData) => {
    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const saveUser = async (userData: IUser) => {
    user.value = userData
    await axios.post('http://localhost:3000/user', userData)
  }

  return { user, saveUser, loadUser, uploadFile }
})
