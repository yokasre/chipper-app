export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: []
    }),

    actions: {
        addPost(post) {
            this.posts.unshift(post)
        },

        setPosts(posts) {
            this.posts = posts
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
}