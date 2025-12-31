export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [],
        favorites: null,
        newPostsCount: 0,
        isPolling: false,
        pollInterval: null
    }),

    actions: {
        setPosts(posts) {
            this.posts = posts
        },

        setFavorites(favorites) {
            this.favorites = favorites
        },

        async checkForNewPosts() {
            const {$api} = useNuxtApp()
            const {showErrorModal} = useHelpers()

            try {
                const latestPostId = this.posts[0]?.id
                if (!latestPostId) return

                const {data: newPosts} = await $api.get('posts', {
                    since: latestPostId
                })

                if (newPosts && newPosts.length > 0) {
                    this.newPostsCount = newPosts.length
                }
            } catch (error) {
                showErrorModal(error)
            }
        },

        async loadNewPosts() {
            const {$api} = useNuxtApp()
            const {showErrorModal} = useHelpers()

            try {
                const latestPostId = this.posts[0]?.id

                const {data: newPosts} = await $api.get('posts', latestPostId ? {since: latestPostId} : {})

                if (newPosts && newPosts.length > 0) {
                    this.posts = [...newPosts, ...this.posts]
                }

                this.newPostsCount = 0
            } catch (error) {
                showErrorModal(error)
            }
        },

        startPolling() {
            if (this.isPolling) return

            this.isPolling = true
            this.pollInterval = setInterval(() => {
                this.checkForNewPosts()
            }, 30000)
        },

        stopPolling() {
            if (this.pollInterval) {
                clearInterval(this.pollInterval)
                this.pollInterval = null
            }
            this.isPolling = false
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
}