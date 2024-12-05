import React from "react";

const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onDelete,
  onSelect,
  isSelected,
}) => {
  return (
    <tr key={item.product._id}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(item.product._id)}
        />
      </td>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={item.product.image_url}
            alt={item.product.name}
            className="me-2"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <span>{item.product.name}</span>
        </div>
      </td>
      <td>Rp {item.price?.toLocaleString("id-ID")}</td>
      <td className="d-flex">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onDecrement(item.product._id, item.qty)}
        >
          -
        </button>
        <span className="mx-2">{item.qty}</span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onIncrement(item.product._id, item.qty)}
        >
          +
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(item._id)}
        >
          Hapus
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
