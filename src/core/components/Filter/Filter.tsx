import { useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import type { SelectOption } from "core/types";
import { SelectField } from "./SelectField";

interface FilterProps {
  levelOptions: Array<SelectOption>;
  nationOptions: Array<SelectOption>;
  classOptions: Array<SelectOption>;
}

export const Filter = ({
  levelOptions,
  nationOptions,
  classOptions,
}: FilterProps) => {
  const [filterParams, setFilterParams] = useSearchParams();

  const clearFilter = () => setFilterParams({});

  const getFilterCount = (): number => {
    const count = filterParams.has("page")
      ? filterParams.size - 1
      : filterParams.size;

    return count;
  };

  return (
    <>
      <SelectField name="level" label="По уровню" options={levelOptions} />
      <SelectField name="nation" label="По нации" options={nationOptions} />
      <SelectField name="class" label="По классу" options={classOptions} />

      <Button
        onClick={clearFilter}
        variant="contained"
        disabled={!getFilterCount()}
      >
        Очистить фильтр
      </Button>
    </>
  );
};
