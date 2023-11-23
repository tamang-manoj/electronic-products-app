const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <h1>Electronic Products</h1>

        <div className="role">
          <label htmlFor="User">User</label>
          <input type="radio" value="User" name="role" />
          <label htmlFor="User">Admin</label>
          <input type="radio" value="Admin" name="role" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
