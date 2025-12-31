<script setup>
import {HeartIcon} from '@heroicons/vue/24/outline'

defineProps({
  post: {
    type: Object,
    required: true
  },
  authorFollowedByUser: {
    type: Boolean,
    default: false
  }
})

const {$api} = useNuxtApp()
const {showErrorModal} = useHelpers()
const user = useUser()

const followAuthor = async (authorID) => {
  try {
    await $api.post(`/users/${authorID}/favorite`)
  } catch (e) {
    showErrorModal(e)
  }
}

const unFollowAuthor = async (authorID) => {
  try {
    await $api.delete(`/users/${authorID}/favorite`)
  } catch (e) {
    showErrorModal(e)
  }
}
</script>

<template>
  <div class="grid gap-3">
    <h4 class="font-bold text-lg">
      {{ post.title }}
    </h4>
    <div class="flex justify-between bg-gray-100 p-4 rounded-lg">
      <div>
        by <strong>{{ post.user.name }}</strong>
      </div>

      <div v-if="(post.user.id !== user.data.id)">
        <button class="font-medium bg-blue-200 text-sm px-2 rounded-full" @click="unFollowAuthor(post.user.id)" v-if="authorFollowedByUser">
          Unfollow
        </button>

        <button class="font-medium bg-blue-200 text-sm px-2 rounded-full" @click="followAuthor(post.user.id)" v-else>
          Follow
        </button>
      </div>
    </div>
    <p>
      {{ post.body }}
    </p>
    <button class="bg-red-200 text-red-500 flex items-center justify-center gap-2 p-4 rounded-lg">
      <HeartIcon
          class="h-6 stroke-current"/>
      <span class="font-bold">
        Add to my favorites
      </span>
    </button>
  </div>
</template>