<script setup>
definePageMeta({
  middleware: ['validate-session']
})

const {$api} = useNuxtApp()
const user = useUser()

const {data: posts} = await $api.get('posts')
const {data: favorites} = await $api.get('favorites')
</script>

<template>
  <PostForm
      v-if="!user.isGuest"/>
  <div class="grid gap-16">
    <PostItem
        v-for="post in posts"
        :key="post.id"
        v-bind="{ post, authorFollowedByUser: favorites?.users.some(user => user.id === post.user.id), postFavoritedByUser: favorites?.posts.some(postFavorite => postFavorite.id === post.id) }"/>
  </div>
</template>
