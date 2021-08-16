class SnikersCartApi  {
  constructor(localId) {
    this._localId = localId;
    this._urlBase = `https://nb-store-6d33f-default-rtdb.europe-west1.firebasedatabase.app/user:${this
      ._localId}.json`;
  }

  getCartData() {
    return fetch(this._urlBase)
      .then(res => res.json()).then(data => {
        if (data) {
          return data;
        } else {
          return {};
        }
      })
  }

  addToCart(sniker) {
    return this.getCartData().then((data) => {
      if (data) {
        return Object.entries(data);
      } else {
        return [];
      }
    }).then(data => {
      const cartItemArr = data.find(it => it[1].id === sniker.id);
      let newItem;

      if (cartItemArr) {
        const cartItem = cartItemArr[1];
        const cartItemKey = cartItemArr[0];

        newItem = {
          id: cartItem.id,
          name: cartItem.name,
          count: cartItem.count + 1,
          total: cartItem.total + cartItem.price,
          img: cartItem.img,
          price: cartItem.price
        }

        return fetch(
          `https://nb-store-6d33f-default-rtdb.europe-west1.firebasedatabase.app/user:${this
        ._localId}/${cartItemKey}.json`, {
          method: "PUT",
          body: JSON.stringify(newItem),
          headers: new Headers({
            "Content-Type": "application/json"
          })
      })

      } else {
        newItem = {
          id: sniker.id,
          name: sniker.name,
          count: 1,
          total: Number(sniker.price.split(" ").join("")),
          img: sniker.img,
          price: Number(sniker.price.split(" ").join("")),
        }

        return fetch(this._urlBase, {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: new Headers({
            "Content-Type": "application/json"
          })
      })
      }       
    })
  }

  decreaseFromCart(sniker) {
    return this.getCartData().then(data => {
      return Object.entries(data);
    }).then(data => {
      const cartItemArr = data.find(it => it[1].id === sniker.id);
      const cartItem = cartItemArr[1];
      const cartItemKey = cartItemArr[0];
        const decreacedItem = {
          id: cartItem.id,
          name: cartItem.name,
          count: cartItem.count - 1,
          total: cartItem.total - cartItem.price,
          img: cartItem.img,
          price: cartItem.price
        }

        fetch(`https://nb-store-6d33f-default-rtdb.europe-west1.firebasedatabase.app/user:${this
      ._localId}/${cartItemKey}.json`,
      {
        method: "PUT",
        body: JSON.stringify(decreacedItem),
        headers: {
          'Content-Type' : 'application/json'
        }
      })
    })
  }

  removeFromCart(sniker) {
    return this.getCartData().then((data) => {
      if (data) {
        return Object.entries(data);
      } else {
        return [];
      }
    }).then((data) => {
      const cardItemArr = data.find(it => it[1].id === sniker.id);
      const cardItemKey = cardItemArr[0];

      return fetch(`https://nb-store-6d33f-default-rtdb.europe-west1.firebasedatabase.app/user:${this
        ._localId}/${cardItemKey}.json`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json"
          })
      })
    })
  }
}

export default SnikersCartApi