import { useSearchParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import type { SelectOption } from "core/types";

interface SelectFieldProps {
  name: string;
  label: string;
  options: Array<SelectOption>;
}

export const SelectField = ({ label, name, options }: SelectFieldProps) => {
  const [selectParams, setSelectParams] = useSearchParams();
  const selectedvalue = selectParams.get(name) ?? "";

  const handleChange = (event: SelectChangeEvent<SelectOption["value"]>) => {
    const { value } = event.target;

    if (!value) {
      selectParams.delete(name);
    } else {
      selectParams.set(name, value);
    }
    setSelectParams(selectParams);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select label={label} onChange={handleChange} value={selectedvalue}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
