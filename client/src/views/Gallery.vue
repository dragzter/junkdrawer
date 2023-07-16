<template>
  <div class="-m-1 flex flex-wrap md:-m-2 py-7">
    <template v-for="image in galleryImages" :key="image.name">
      <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2 cursor-pointer">
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center"
            :src="image.url"
            @click="showModal(image)"
          />
        </div>
      </div>
    </template>
  </div>

  <ImageModal :selected-image="selctedImage" v-if="modalVisible" :close="closeModal" />
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
  },
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
  },
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
  },
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
