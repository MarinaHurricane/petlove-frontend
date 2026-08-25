import type { StylesConfig } from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};

export const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base) => ({
    ...base,
    minHeight: window.innerWidth >= 768 ? "48px" : "42px",
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
    marginTop: window.innerWidth <= 768 ? "0" : "4px",
    marginBottom: "2px",
  }),

  valueContainer: (base) => ({
    ...base,
  }),

  singleValue: (base) => ({
    ...base,
    marginTop: window.innerWidth <= 768 ? "0" : "4px",
    marginBottom: "2px",
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

  clearIndicator: (base) => ({
    ...base,
    paddingRight: 0,
    marginRight: 20,
    marginTop: 4,
    color: "#111",
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
};

export const asyncStyles: StylesConfig<SelectOption, false> = {
  dropdownIndicator: (base) => ({
    ...base,
    display: "none",
  }),

  placeholder: (base, state) => ({
    ...base,
    color: state.isFocused ? "#D3D3D3" : "#111",
    marginTop: window.innerWidth <= 768 ? "0" : "4px",
    marginBottom: "2px",
  }),
};
