import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const Carts = () => {
  const [cart, isLoading, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    const quantity = item.quantity || 0;
    return total + price * quantity;
  }, 0);

  const axiosSecure = useAxiosSecure();

  const handleClear = (id) => {
    axiosSecure.delete(`/carts/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast.success("Cleared!");
        refetch();
      }
    });
  };

  const handleQuantityChange = (id, quantity) => {
    axiosSecure.patch(`/carts/${id}`, { quantity }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          <span className="loading loading-bars loading-lg"></span>
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Health || Cart</title>
      </Helmet>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 p-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your cart is empty!
          </h2>
          <p className="text-gray-500 mb-4">
            You have not added any medicines to your cart yet. Browse our shop
            and select the items you need.
          </p>
          <Link to="/shopPage">
            <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
              Go to Shop
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="text-xl font-semibold text-green-950 mt-10 mb-4 px-4">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
          <div className="overflow-x-auto mx-4 md:mx-10 my-10">
            {/* Desktop View */}
            <div className="hidden md:block">
              <table className="table-auto w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b">#</th>
                    <th className="py-2 px-4 border-b">Image</th>
                    <th className="py-2 px-4 border-b">Company Name</th>
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center">
                          <img
                            src={item.image || "https://via.placeholder.com/50"}
                            alt={item.company}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b">{item.company}</td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="btn btn-ghost btn-xs"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="input input-bordered input-xs w-16 text-center"
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="btn btn-ghost btn-xs"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b">{item.price}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleClear(item._id)}
                          className="btn btn-ghost btn-xs"
                        >
                          Clear
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
              {cart.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-lg mb-4 p-4 shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.company}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-bold">{item.company}</h2>
                      <p className="text-gray-600">Price: {item.price}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      className="btn btn-ghost btn-xs"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="input input-bordered input-xs w-16 text-center"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className="btn btn-ghost btn-xs"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleClear(item._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4 px-4">
              <button
                className="btn btn-outline text-xl font-bold"
                disabled={cart.length === 0}
              >
                <Link to="/payment">CHECK-OUT</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Carts;
