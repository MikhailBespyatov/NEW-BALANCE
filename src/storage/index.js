const Key = {
    liked: 'liked',
};

export default class Storage {
    constructor(key, storage) {
        this._storeKey = key;
        this._storage = storage;
    }

    getLikedSniker(id) {
        const storedLikedSnikers = this.getLikedSnikers();
        if (storedLikedSnikers) {
            return storedLikedSnikers[id];
        }   
    }

    removeLikedSniker(id) {
        const storedLikedSnikers = this.getLikedSnikers();

        delete storedLikedSnikers[id];
        
        this.setLikedSnikers(storedLikedSnikers);
    }

    setLikedSniker(id, likedSniker) {
        const storedLikedSnikers = this.getLikedSnikers();

        this.setLikedSnikers({...storedLikedSnikers, [id]: likedSniker})
    }

    getLikedSnikers() {
        return this._getItems()[Key.liked];
    }

    setLikedSnikers(likedSnikers) {
        this._setItem(Key.liked, likedSnikers);
    }

    _setItem(key, value) {
        const store = this._getItems();

        this._storage.setItem(
            this._storeKey,
            JSON.stringify(
                {
                    ...store,
                    [key]: value,
                }
            ),
        );
    }

    _getItems() {
        try {
            return JSON.parse(this._storage.getItem(this._storeKey)) || {};
        } catch {
            return {};
        }
    }
}