//context
import { useGlobalContext } from "../hooks/useGlobalContext";

//components
import { TableItem } from "../components";

function Cart() {
  const { products, totalProducts, totalPrice, addToCard } = useGlobalContext();
  return (
    <div className="h-lvh">
      <div className="overflow-x-auto card glass text-black px-7 pt-5 pb-2">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Title</th>
              <th>Price</th>
              <th>Change Amount</th>
              <th>
                {" "}
                <p>Delete</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product) => {
              return <TableItem key={product.id} product={product} />;
            })}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Total Price ${totalPrice.toFixed(2)}</th>
              <th>Change Amount</th>
              <th>
                {" "}
                <button className="btn btn-ghost btn-xs">
                  Delete Selected
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Cart;
