import { selectedRole } from "../features/role/roleSlice";
import { useDispatch } from "react-redux";
import { GrCart } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hooks";

const Navbar = () => {
  const dispatch = useDispatch();

  const role = useAppSelector((state) => state.role.role);

  const navigate = useNavigate();

  const handleSelectRole = (e: any) => {
    const role = e.target.value;
    dispatch(selectedRole(role));
    role ? navigate("/") : null;
    // console.log(role);
  };

  return (
    <>
      <div className="navbar">
        <h1>Electronic Products</h1>
        <div className="cart-or-add">
          {role === "user" ? (
            <GrCart onClick={() => navigate("/cart")} />
          ) : (
            <div>
              <IoMdAddCircleOutline
                onClick={() => {
                  navigate("/products/addProduct");
                }}
              />
            </div>
          )}
        </div>

        <div className="role">
          <select
            name="role"
            id="role"
            defaultValue="user"
            onChange={handleSelectRole}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;
