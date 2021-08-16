export const likeItem = "LIKE_ITEM";
export const FETCH_CART_REQUESTED = "FETCH_CART_REQUESTED";
export const FETCH_CART_LOADED = "FETCH_CART_LOADED";
export const FETCH_CART_ERROR = "FETCH_CART_ERROR";
export const FETCH_SNIKERS_LOADED = "FETCH_SNIKERS_LOADED";
export const FETCH_SNIKERS_ERROR = "FETCH_SNIKERS_ERROR";
export const FETCH_SNIKERS_REQUESTED = "FETCH_SNIKERS_REQUESTED";
export const FETCH_CART_ITEM_LOADING = "FETCH_CART_ITEM_LOADING";
export const FETCH_CART_ITEM_LOADED = "FETCH_CART_ITEM_LOADED";
export const FETCH_CART_ITEM_FAILURE = "FETCH_CART_ITEM_FAILURE";
export const addToCart = "ADD_TO_CART";
export const removeFromCart = "REMOVE_FROM_CART";
export const decreaseFromCart = "DECREASE_FROM_CART";
export const SUM_CART_TOTAL_COUNT = "SUM_CART_TOTAL_COUNT";
export const SUM_LIKED_SNIKERS = "SUM_LIKED_SNIKERS";
export const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";
export const RESET_CART_TOTAL_COUNT = 'RESET_CART_TOTAL_COUNT';

export const resetCartTotalCount = () => {
  return {
    type: RESET_CART_TOTAL_COUNT
  }
}

export const setSearchText = (text) => {
  return {
    type: SET_SEARCH_TEXT,
    payload: text
  }
};

export const sumLikedSnikers = () => {
  return {
    type: SUM_LIKED_SNIKERS,
  }
}

const sumCartTotalCountAction = () => {
  return {
    type: SUM_CART_TOTAL_COUNT
  };
};

const fetchCartItemLoadingAction = () => {
  return {
    type: FETCH_CART_ITEM_LOADING
  };
};

const fetchCartItemFailureAction = err => {
  return {
    type: FETCH_CART_ITEM_FAILURE,
    payload: err
  };
};

const snikersRequestedAction = () => {
  return {
    type: FETCH_SNIKERS_REQUESTED
  };
};

export const snikersLoadedAction = newData => {
  return {
    type: FETCH_SNIKERS_LOADED,
    payload: newData
  };
};

const snikersErrorAction = err => {
  return {
    type: FETCH_SNIKERS_ERROR,
    payload: err
  };
};

const cartRequestedAction = () => {
  return {
    type: FETCH_CART_REQUESTED
  };
};

const cartLoadedAction = newData => {
  return {
    type: FETCH_CART_LOADED,
    payload: newData
  };
};

const cartErrorAction = err => {
  return {
    type: FETCH_CART_ERROR,
    payload: err
  };
};

export const likeItemAction = id => {
  return {
    type: likeItem,
    payload: id
  };
};

const addToCartAction = id => {
  return {
    type: addToCart,
    payload: id
  };
};

const removeFromCartAction = id => {
  return {
    type: removeFromCart,
    payload: id
  };
};

const decreaseFromCartAction = id => {
  return {
    type: decreaseFromCart,
    payload: id
  };
};

export const fetchSnikers = (dispatch, snikersService, likedStorage) => {
  dispatch(snikersRequestedAction());
  snikersService
    .getAllSkiners()
    .then(data =>
      data.map(item => {
        const likedStorageItem = likedStorage.getLikedSniker(item.id);
        if (likedStorageItem) {
          return likedStorageItem;
        } else {
          return item;
        }
      })
    )
    .then(data => {
      dispatch(snikersLoadedAction(data));
      dispatch(sumLikedSnikers());
    })
    .catch(err => dispatch(snikersErrorAction(err)));
};

export const fetchCartItems = (dispatch, snikersCartApi) => {
  dispatch(cartRequestedAction());
  snikersCartApi
    .getCartData()
    .then(data => {
      if (data) {
        dispatch(cartLoadedAction(Object.values(data)));
        dispatch(sumCartTotalCountAction());
      } else {
        dispatch(cartLoadedAction(null));
        dispatch(sumCartTotalCountAction());
      }
    })
    .catch(err => dispatch(cartErrorAction(err)));
};

export const fetchAddCartItem = (dispatch, snikersCartApi, cartItem) => {
  dispatch(fetchCartItemLoadingAction());
  snikersCartApi
    .addToCart(cartItem)
    .then(() => {
      dispatch(addToCartAction(cartItem.id));
      dispatch(sumCartTotalCountAction());
    })
    .catch(err => dispatch(fetchCartItemFailureAction(err)));
};

export const fetchDecreaseFromCart = (dispatch, snikersCartApi, cartItem) => {
  dispatch(fetchCartItemLoadingAction());
  snikersCartApi
    .decreaseFromCart(cartItem)
    .then(() => {
      dispatch(decreaseFromCartAction(cartItem.id));
      dispatch(sumCartTotalCountAction());
    })
    .catch(err => dispatch(fetchCartItemFailureAction(err)));
};

export const fetchRemoveFromCart = (dispatch, snikersCartApi, cartItem) => {
  dispatch(fetchCartItemLoadingAction());
  snikersCartApi
    .removeFromCart(cartItem)
    .then(() => {
      dispatch(removeFromCartAction(cartItem.id));
      dispatch(sumCartTotalCountAction());
    })
    .catch(err => dispatch(fetchCartItemFailureAction(err)));
};
