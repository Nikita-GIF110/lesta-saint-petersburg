export interface Vehicle {
  id: string;
  description: string;
  icons: {
    large: string;
    medium: string;
    small: string;
    default: string;
  };
  level: number;
  nation: {
    color: string;
    icons: Vehicle["icons"];
    name: string;
    title: string;
  };
  title: string;
  typeName: string;
  type: {
    icons: Vehicle["icons"];
    name: string;
    title: string;
  };
}

export type SelectOption = {
  label: string;
  value: string;
};
