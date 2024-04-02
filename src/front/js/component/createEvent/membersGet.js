import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Context } from "../../store/appContext";

export const MembersGet = ({ onChange }) => {
  const [users, setUsers] = useState([]);
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.getAllUsers().then((data) => {
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("getAllUsers did not return an array:", data);
      }
    });
  }, []);

  const handleChange = (selected) => {
    // Aquí puedes manejar los usuarios seleccionados
    console.log(selected);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "40px",
      marginTop: "10px",
    }),
    option: (provided) => ({
      ...provided,
    }),
  };

  const options = users.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  return (
    <div>
      <label className="title_inputs">Miembros</label>
      <Select
        isMulti
        name="members"
        options={options}
        className="mutliSelect"
        onChange={onChange}
        styles={customStyles}
      />
    </div>
  );
};
