class SnikersService {
    getAllSkiners() {
        return fetch('https://nb-store-6d33f-default-rtdb.europe-west1.firebasedatabase.app/snikers.json')
        .then((response) => response.json()).then(data => data)
    }
}


export const snikersService = new SnikersService();