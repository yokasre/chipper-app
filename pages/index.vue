<script setup>
import {usePostsStore} from "../stores/posts";

definePageMeta({
  middleware: ['validate-session']
})

const {$api} = useNuxtApp()
const user = useUser()
const postsStore = usePostsStore()

const {data: posts} = await $api.get('posts')

let favorites = null
try {
  const response = await $api.get('favorites')
  favorites = response.data
} catch (error) {
  // pass
}

postsStore.setPosts(posts)
postsStore.setFavorites(favorites)

onMounted(() => {
  postsStore.startPolling()
})

onBeforeUnmount(() => {
  postsStore.stopPolling()
})

const handleLoadNewPosts = async () => {
  await postsStore.loadNewPosts()

  const {data: updatedFavorites} = await $api.get('favorites')
  postsStore.setFavorites(updatedFavorites)
}
</script>

<template>
  <PostForm
      v-if="!user.isGuest"/>

  <div
      v-if="postsStore.newPostsCount > 0"
      class="my-4 flex justify-center">
    <button
        @click="handleLoadNewPosts"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200">
      Load {{ postsStore.newPostsCount }} New {{ postsStore.newPostsCount === 1 ? 'Post' : 'Posts' }}
    </button>
  </div>

  <div class="grid gap-16">
    <PostItem
        v-for="post in postsStore.posts"
        :key="post.id"
        v-bind="{
          post,
        authorFollowedByUser: postsStore.favorites?.users.some(user => user.id === post.user.id),
        postFavoritedByUser: postsStore.favorites?.posts.some(postFavorite => postFavorite.id === post.id)
        }"/>
  </div>
</template>
