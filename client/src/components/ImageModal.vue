<template>
  <!-- The Modal -->
  <div
    id="modal"
    class="fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center"
  >
    <!-- The close button -->
    <a
      class="fixed z-90 top-3 right-6 text-white text-5xl font-bold"
      href="javascript:void(0)"
      @click="props.close()"
      >&times;</a
    >

    <!-- A big image will be displayed here -->
    <img
      id="modal-img"
      class="max-w-[1100px] max-h-[900px] object-cover"
      :src="props.selectedImage.url"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedImage: {
    type: Object,
    require: true,
    default: { url: '' }
  },
  close: {
    type: Function,
    required: true
  }
})
</script>
