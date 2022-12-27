import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    /*=====================================
    Checking if the item are already exixt
    =======================================*/
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if(existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem
      } else {
      // concat add a new item to a new array
        updatedItems = state.items.concat(action.item);
      }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // Clear the cart when the order is submitted successfully
  if(action.type==='CLEAR') {
    return defaultCartState;
  }

  if(action.type==='REMOVE') {

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if(existingItem.amount === 1) {
          updatedItems = state.items.filter(item=>action.id!==item.id);
      } else {
        const updatedItem = {...existingItem,amount:existingItem.amount-1};
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return{
        items:updatedItems,
        totalAmount:updatedTotalAmount
      };

  }
  return defaultCartState;
};

const CartProvider = (props) => {
  /* useReducer:
  -- Tge parameter "defaultCartState" is the Initual state of the useReducer.
  -- cartReducer is a function that get a state and action.
  -- Dispath action thats mean run a function by type (ADD or REMOVE in this case)
  */
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = ()=>{
    dispatchCartAction({type:'CLEAR'});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
