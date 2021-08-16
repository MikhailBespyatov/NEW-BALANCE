import {
  likeItem,
  FETCH_SNIKERS_LOADED,
  addToCart,
  removeFromCart,
  decreaseFromCart,
  FETCH_CART_LOADED,
  FETCH_SNIKERS_ERROR,
  FETCH_CART_REQUESTED,
  FETCH_SNIKERS_REQUESTED,
  FETCH_CART_ERROR,
  FETCH_CART_ITEM_LOADED,
  FETCH_CART_ITEM_LOADING,
  FETCH_CART_ITEM_FAILURE,
  SUM_CART_TOTAL_COUNT,
  SUM_LIKED_SNIKERS,
  SET_SEARCH_TEXT,
  RESET_CART_TOTAL_COUNT
} from "../actions";

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
};

const initialState = {
  NBData: [],
  loading: true,
  error: null,

  cartLoading: false,
  cartError: null,
  cartItems: [],

  fullCost: 0,
  cartTotalCount: 0,
  totalLikedSnikers: 0,
  searchText: ''
};

const updateCartItems = (cartItems, newItem, idx) => {
  if (idx < 0) {
    return [...cartItems, newItem];
  } else {
    return [...cartItems.slice(0, idx), newItem, ...cartItems.slice(idx + 1)];
  }
};

const updateCartItem = (item, cartItem) => {
  if (cartItem) {
    return {
      ...cartItem,
      count: cartItem.count + 1,
      total: cartItem.total + Number(item.price.split(" ").join(""))
    };
  } else {
    return {
      id: item.id,
      name: item.name,
      count: 1,
      total: Number(item.price.split(" ").join("")),
      img: item.img
    };
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SNIKERS_REQUESTED:
      return updateObject(state, {NBData: [], loading: true, error: null});
    case FETCH_SNIKERS_ERROR:
      return updateObject(state, {NBData: [], loading: false, error: action.payload});
    case FETCH_SNIKERS_LOADED:
      return {
        ...state,
        NBData: action.payload,
        loading: false,
        error: null
      };
    case FETCH_CART_LOADED:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
        error: null
      };
    case FETCH_CART_REQUESTED:
      return {
        ...state,
        cartItems: [],
        loading: true,
        error: null
      };
    case FETCH_CART_ERROR:
      return {
        ...state,
        cartItems: [],
        loading: false,
        error: action.payload
      };
    case FETCH_CART_ITEM_LOADING:
      return {
        ...state,
        cartLoading: true,
        cartError: null
      };
    case FETCH_CART_ITEM_LOADED:
      return {
        ...state,
        cartLoading: false,
        cartError: null
      };
    case FETCH_CART_ITEM_FAILURE:
      return {
        ...state,
        cartLoading: false,
        cartError: action.payload
      };
    case likeItem:
      const index = state.NBData.findIndex(it => it.id === action.payload);
      const updateSniker = state.NBData[index];
      const likedSniker = { ...updateSniker, liked: !updateSniker.liked };
      return {
        ...state,
        NBData: [
          ...state.NBData.slice(0, index),
          likedSniker,
          ...state.NBData.slice(index + 1)
        ]
      };
    case addToCart:
      const item = state.NBData.find(it => it.id === action.payload);
      const itemIndex = state.cartItems.findIndex(
        it => it.id === action.payload
      );
      const cartItem = state.cartItems[itemIndex];

      const newItem = updateCartItem(item, cartItem);

      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, itemIndex),
        cartError: null,
        cartLoading: false
      };
    case removeFromCart:
      const deletedIndex = state.cartItems.findIndex(
        it => it.id === action.payload
      );
      return {
        ...state,
        cartError: null,
        cartLoading: false,
        cartItems: [
          ...state.cartItems.slice(0, deletedIndex),
          ...state.cartItems.slice(deletedIndex + 1)
        ]
      };
    case decreaseFromCart:
      const decreaseItemIndex = state.cartItems.findIndex(
        it => it.id === action.payload
      );
      const sniker = state.NBData.find(it => it.id === action.payload);
      const decreaseItem = state.cartItems[decreaseItemIndex];
      const decreasedItem = {
        ...decreaseItem,
        count: decreaseItem.count - 1,
        total: decreaseItem.total - Number(sniker.price.split(" ").join(""))
      };

      if (decreaseItem.count > 1) {
        return {
          ...state,
          cartError: null,
          cartLoading: false,
          cartItems: [
            ...state.cartItems.slice(0, decreaseItemIndex),
            decreasedItem,
            ...state.cartItems.slice(decreaseItemIndex + 1)
          ]
        };
      } else {
        return state;
      }

    case SUM_CART_TOTAL_COUNT:
      const cartTotalCount = state.cartItems.reduce((acc, current) => {
        return acc + current.count;
      }, 0);

      return {
        ...state,
        cartTotalCount
      };
    case RESET_CART_TOTAL_COUNT:
      return updateObject(state, {cartTotalCount: 0});
    case SUM_LIKED_SNIKERS:
      const totalLikedSnikers = state.NBData.reduce((acc, current) => {
        if (current.liked) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      return {
        ...state,
        totalLikedSnikers
      };
    case SET_SEARCH_TEXT: 
      return updateObject(state, {searchText: action.payload});
    default:
      return state;
  }
};
