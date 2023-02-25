import React, { useState , useEffect } from "react";
import { IUser } from "../../../interface";
import { CustomeInput , Button } from "../../../components"
import { successMessage } from "../../ToastMessage";
import "./ModalUser.styles.scss";
import { addUserFunc, updateUserFunc } from "./type";

interface Props {
  data?: IUser;
  isUpdate: boolean;
  setListUser: React.Dispatch<React.SetStateAction<IUser[]>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

interface Inputs {
  name: string;
  email: string;
}

const ModalUser = ({ data, isUpdate, setListUser, setIsOpenModal }: Props) => {
  const { name, email, id } = data || { name: "", email: "", id: "" };

  const [valueInputs, setValueIputs] = useState<Inputs>({
    name,
    email,
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueIputs({ ...valueInputs, [name]: value });
  };

  const addUser: addUserFunc = (name, email) => {
    const id = Math.floor(Math.random() * 100000000).toString();
    const newUser = { name, email, id };
    setListUser((prev) => [...prev, newUser]);
    successMessage("Add user successfully");
    setIsOpenModal(false);
  };

  const updateUser: updateUserFunc = (name, email, id) => {
    setListUser( (prev) =>
      {
        return prev.map ( user => {
          if ( user.id == id ) {
            user.name = name ;
            user.email = email ;
          }
          return user ;
        } )
      }
    );
    successMessage("Add user successfully");
    setIsOpenModal(false);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email } = valueInputs;
    if (!isUpdate) {
      addUser(name, email);
    } else {
      updateUser(name, email, id);
    }
  };

  useEffect( () => {
    const overlayModal = document.querySelector(".modal__overlay") ;
    const handle = (e: Event) => {
       const target = e.target as HTMLElement ;
       if ( target.classList.contains("modal__container") || target.closest(".modal__container") ) {
        return ;
       }
       setIsOpenModal(false) ;
    }
    overlayModal?.addEventListener("click" , e => handle(e) )
    return () => {
    overlayModal?.removeEventListener("click" , e => handle(e) )
    }
  })

  return (
    <div className="modal__overlay">
      <div className="modal__container">
        <div className="modal__container--header">{`${isUpdate ? 'Update' : 'Add'} User`}</div>
        <form
          onSubmit={(e) => {
            handleSubmitForm(e);
          }}
          action=""
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "70%",
          }}
        >
          <CustomeInput
            handleChangeInput={handleChangeInput}
            name="name"
            value={valueInputs.name}
            type="text"
            placeholder="Enter your name"
          />
          <CustomeInput
            handleChangeInput={handleChangeInput}
            name="email"
            value={valueInputs.email}
            type="email"
            placeholder="Enter your email"
          />
          <Button
            disabled={
              isUpdate
                ? name == valueInputs.name && email == valueInputs.email
                  ? true
                  : false
                : false
            }
          >
            {isUpdate ? "Update" : "Add"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalUser;
