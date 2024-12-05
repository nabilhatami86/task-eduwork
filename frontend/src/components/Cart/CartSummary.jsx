import { useNavigate } from "react-router-dom";

const CartSummary = ({
  items,
  calculateSubtotal,
  isCheckoutEnabled,
  selectedItems,
}) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="text-center">Ringkasan Belanja</h4>
      </div>
      <div className="card-body">
        <table className="table table-borderless">
          <thead className="text-start">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => selectedItems.includes(item.product._id))
              .map((item, index) => (
                <tr key={item.product._id || index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <span>{item.product.name}</span>
                    </div>
                  </td>
                  <td className="text-center">{item.qty || 0}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h5 className="card-title">
          Total: Rp {calculateSubtotal().toLocaleString("id-ID")}
        </h5>
        <button
          className="btn btn-success w-100"
          onClick={() => navigate("/checkout")}
          disabled={!isCheckoutEnabled}
        >
          Beli
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
