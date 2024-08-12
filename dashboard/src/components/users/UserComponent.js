import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUser, deleteUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { toast } from "react-toastify";

const UserComponent = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { error: deleteError, success: deleteSuccess } = userDelete;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch, deleteSuccess]);

  useEffect(() => {
    if (users) {
      setFilteredUsers(users);
    }
  }, [users]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("User deleted successfully");
    }
    if (deleteError) {
      toast.error(deleteError);
    }
  }, [deleteSuccess, deleteError]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercasedSearchTerm) ||
        user.email.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredUsers(filtered);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Deleting user with id:", id);
      dispatch(deleteUser(id));
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Users</h2>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-6 col-md-8 mx-auto d-flex justify-content-center">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                type="button"
                className="search-button btn btn-primary ms-2"
                onClick={handleSearchClick}
              >
                Search
              </button>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {filteredUsers.map((user) => (
                <div className="col" key={user._id}>
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src="images/user.png"
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">{user.name}</h5>
                      <div className="card-text text-muted">
                        {user.isAdmin === true ? (
                          <p className="m-0">Admin</p>
                        ) : (
                          <p className="m-0">User</p>
                        )}

                        <p>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteHandler(user._id)}
                        disabled={user.isAdmin}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserComponent;