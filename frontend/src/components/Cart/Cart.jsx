import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, updateQty, deleteCart } from "../../redux/cartSlice";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import "./css/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [selectedItems, setSelectedItems] = useState([]);

  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    if (token) {
      dispatch(getCartItems());
    } else {
      console.error("Token is not available");
    }
  }, [token, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCart(id)).then(() => {
      dispatch(getCartItems());
    });
  };

  const handleIncrement = (product_id, currentQty) => {
    dispatch(updateQty({ product_id, qty: currentQty + 1 })).then(() => {
      dispatch(getCartItems());
    });
  };

  const handleDecrement = (product_id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQty({ product_id, qty: currentQty - 1 })).then(() => {
        dispatch(getCartItems());
      });
    } else if (currentQty === 1) {
      handleDelete(product_id);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id];
      console.log(updatedSelectedItems);
      return updatedSelectedItems;
    });
  };

  const isCheckoutEnabled = selectedItems.length > 0;

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      if (selectedItems.includes(item.product._id)) {
        total += item.price * item.qty;
      }
      return total;
    }, 0);
  };

  if (!items || items.length === 0) {
    return <p>Keranjang kosong</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h1 className="fs-4 mt-3 mb-4">Keranjang</h1>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Check</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onDelete={handleDelete}
                  onSelect={handleSelectItem}
                  isSelected={selectedItems.includes(item.product._id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4 mt-4">
          <CartSummary
            items={items}
            calculateSubtotal={calculateSubtotal}
            isCheckoutEnabled={isCheckoutEnabled}
            selectedItems={selectedItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
