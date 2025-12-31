export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: []
    }),

    actions: {
        addFavorite(favorite) {
            this.favorites.unshift(favorite)
        },

        setFavorites(favorites) {
            this.favorites = favorites
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFavoritesStore, import.meta.hot))
}