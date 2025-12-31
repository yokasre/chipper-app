<script setup>

const {$api} = useNuxtApp()
const {showErrorModal} = useHelpers()

const postData = reactive({
  title: '',
  body: '',
  image: null
})

const fileInputRef = ref(null)

async function submit() {
  if (!postData.title || !postData.body) {
    return showErrorModal(null, 'A post must have a title and a body')
  }

  try {
    const formData = new FormData();
    formData.append('title', postData.title)
    formData.append('body', postData.body)
    if (postData.image) {
      formData.append('image', postData.image)
    }

    await $api.post('/posts', formData)
    clearForm()
  } catch (e) {
    showErrorModal(e)
  }
}

function clearForm() {
  postData.title = ''
  postData.body = ''
  postData.image = null

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const handleFileUpload = (e) => {
  postData.image = e.target.files[0];
}
</script>

<template>
  <form
      class="grid gap-4 mb-16"
      @submit.prevent="submit">
    <input
        placeholder="Post title"
        v-model="postData.title"
        class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base">

    <textarea
        placeholder="What is happening?!"
        v-model="postData.body"
        class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"></textarea>

    <input type="file" @change="handleFileUpload" accept="image/*" ref="fileInputRef"
           class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base">

    <button class="bg-blue-600 text-white px-8 py-4 rounded-lg">
      Post
    </button>
  </form>
</template>