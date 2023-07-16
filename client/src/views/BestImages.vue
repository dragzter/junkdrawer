<template>
  <div>
    <template v-for="image in galleryImages" :key="image.name">
      <img
        class="py-5 mx-auto w-3/4 h-full object-cover cursor-pointer"
        @click="showModal(image)"
        :src="image.url"
      />
    </template>

    <!-- The Modal -->
    <ImageModal :selected-image="selctedImage" v-if="modalVisible" :close="closeModal" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ImageModal from '@/components/ImageModal.vue'

const galleryImages = [
  {
    name: 'image 1',
    url: '/src/assets/images/junk-drawer 2.jpg'
  },
  {
    name: 'image 2',
    url: '/src/assets/images/junk-drawer-004.jpeg'
  },
  {
    name: 'image 3',
    url: '/src/assets/images/junk-drawer003.jpeg'
  }
]
const modalVisible = ref(false)
const selctedImage = ref<{ [key: string]: string }>({})

const showModal = (image: { [key: string]: string }) => {
  modalVisible.value = true
  selctedImage.value = image
}

const closeModal = () => {
  modalVisible.value = false
}
</script>
