import { Link } from "react-router-dom";

//global cotext
import { useGlobalContext } from "../hooks/useGlobalContext";

//firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Navbar() {
  const { user, totalProducts, totalPrice } = useGlobalContext();

  const signOutProfile = async () => {
    await signOut(auth);
    toast.success("See you Soon!");
  };

  return (
    <div className="navbar bg-base-100 pb-0 px-0 text-emerald-500 rounded-2xl border flex justify-between w-full">
      <div className="navbar-start w-60 ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <button
                onClick={signOutProfile}
                className=" font-serif text-lg bg-red-300 font-semibold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-white text-4xl font-bold font-serif italic text-info"
        >
          Dummy Store
        </Link>
      </div>
      <div className="navbar-center hidden rounded-2xl lg:flex">
        <ul className="menu menu-horizontal px-1  flex gap-5">
          <li className="text-xl font-medium font-serif">
            <Link to="/">Home</Link>
          </li>

          <li className="text-xl font-medium font-serif">
            <Link to="/about">About</Link>
          </li>
          <li className="text-xl font-medium font-serif">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="p-0">
        <div className="flex-none mr-4  ">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {totalProducts}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">
                  {" "}
                  {totalProducts} All Products
                </span>
                <span className="text-info">
                  Total Price:$ {totalPrice.toFixed(2)}{" "}
                </span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex pr-0 w-40 lg:flex-col gap-3 items-center">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={user.photoURL} />
            </div>
          </div>
          <div>
            <p className="flex w-full font-medium capitalize text-center">
              {user.displayName}
            </p>
          </div>
        </div>
        <div className="navbar-end">
          <button
            onClick={signOutProfile}
            className="hidden lg:btn font-serif text-xl font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
