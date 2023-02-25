import React, { useState, useEffect } from "react";
import {
  successMessage,
  warningConfirmBox,
  SearchInput,
  Button,
  UserDisplay,
  ModalUser,
  Loading,
} from "./components";
import { IUser, IUserForm } from "./interface";
import "./styles/app.scss";

function App() {
  const [listUser, setListUser] = useState<IUser[]>([
    { name: "Hiếu", email: "eightbi.dev@gmail.com", id: "1" },
  ]);
  const [currentUserForm, setCurrentUserForm] = useState<IUserForm>({
    data: undefined,
    isUpdate: false,
  });
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterUser , setFilterUser] = useState<IUser[]>() ;

  console.log(loading);

  const handleAddUser = () => {
    setCurrentUserForm({
      data: undefined,
      isUpdate: false,
    });
    setIsOpenModal(true);
  };

  const handleRemoveUser = (userId: string) => {
    warningConfirmBox({
      message: "Are you absolutely sure ? This action cannot be undone.",
      yes: () => {
        successMessage("Delete user successfully");
        setListUser((prev) => prev.filter((user) => user.id != userId));
      },
    });
  };

  const handleUpdateUser = (user: IUser) => {
    setCurrentUserForm({
      data: user,
      isUpdate: true,
    });
    setIsOpenModal(true);
  };

  useEffect(() => {
    // make sure to catch any error
    try {
      // declare the data fetching function
      const fetchData = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const fetchedData = await res.json();
        setListUser(fetchedData);
        setFilterUser(fetchedData) ;
      };
      // call the function
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "#f4f5f6",
        height: "fit-content",
        position: "relative",
        marginBottom:'50px' ,
      }}
    >
      {isOpenModal && (
        <ModalUser
          setIsOpenModal={setIsOpenModal}
          data={currentUserForm.data}
          isUpdate={currentUserForm.isUpdate}
          setListUser={setListUser}
        />
      )}
      <header>
        <div className="headerText">
          <h2>User Management</h2>
          <p>{"Home > Permissions > & Accounts > User Management"}</p>
        </div>
        <div className="header__contact">
          <SearchInput
            handleSearchInput={setFilterUser}
            placeholder="Search user"
            listUser={listUser}
            setLoading={setLoading}
          />
          <Button handleClickBtn={handleAddUser}>Add User</Button>
        </div>
      </header>
      <div>
        {
          loading ? <Loading/> :
          <table className="tableUser">
          <tbody>
            <tr>
              <th style={{ width: "10%" }}></th>
              <th style={{ width: "40%" }}>Infomation</th>
              <th>Action</th>
            </tr>
            {filterUser?.map((user) => (
              <tr key={user.id} className="rawUser">
                <td>
                  <input type="checkbox" name="" id="" />
                </td>
                <td>
                  <UserDisplay user={user} />
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      height: "70px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      onClick={() => {
                        handleUpdateUser(user);
                      }}
                      className="actionUser"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                      <span style={{ marginLeft: "5px" }}>Modify User</span>
                    </button>
                    <button
                      onClick={() => {
                        handleRemoveUser(user.id);
                      }}
                      className="actionUser"
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                      <span style={{ marginLeft: "5px" }}>Remove User</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
        }
      </div>
    </div>
  );
}

export default App;
