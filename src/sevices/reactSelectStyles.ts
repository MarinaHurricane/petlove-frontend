export const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "42px",
    border: "none",
    borderRadius: "0",
    boxShadow: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "flex",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#111",
    margin: "auto 0",
    // position: "absolute",
    // top: "50%",
    // transform: "translateY(1px)",
  }),

  valueContainer: (base) => ({
    ...base,
    // display: "flex",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#111",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#111",
    padding: "auto",
   
  }),

    menu: (provided) => ({
    ...provided,
    marginTop: "8px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
  }),

  menuList: (provided) => ({
    ...provided,
    padding: "12px 0",
    maxHeight: "250px",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: "white",

    color: state.isFocused || state.isSelected ? "#D99B55" : "#333",

    padding: "8px 20px",
    cursor: "pointer",
  }),

  // menu: (base) => ({
  //   ...base,
  //   borderRadius: "8px",
  //   overflow: "hidden",
    
  // }),

  // option: (base, state) => ({
  //   ...base,
  //   backgroundColor: state.isFocused ? "#f2f2f2" : "white",
  //   color: "#111",
  //   cursor: "pointer",
  // }),
};
