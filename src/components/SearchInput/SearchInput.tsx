import React, { useState, useMemo , useEffect } from "react";
import { useDebounce } from "../../hook/useDebounce";
import { IUser } from "../../interface";
import "./SearchInput.styles.scss";

interface Props {
  placeholder: string;
  handleSearchInput: React.Dispatch<React.SetStateAction<IUser[] | undefined>>;
  listUser: IUser[];
  setLoading : React.Dispatch<React.SetStateAction<boolean>> ,
}

const SearchInput = ({ placeholder, handleSearchInput, listUser , setLoading }: Props) => {
  const [valueInput, setValueInput] = useState<string>("");
  const valueSearch = useDebounce(valueInput, 1000);

  const resultSearch = useMemo(() => {
    return listUser.filter((user) => user.name.includes(valueSearch));
  }, [valueSearch , listUser ]);

  useEffect( () => { 
    handleSearchInput(resultSearch) ;
    setLoading(false) ;
  } , [resultSearch] )

  console.log(listUser)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
    setLoading(true) ;
  };
  return (
    <div className="input__wrapper">
      <input
        type="text"
        value={valueInput}
        placeholder={placeholder}
        onChange={(e) => {
          handleChangeInput(e);
        }}
      />
      <i className="fa-solid fa-magnifying-glass"></i>
    </div>
  );
};

export default SearchInput;
