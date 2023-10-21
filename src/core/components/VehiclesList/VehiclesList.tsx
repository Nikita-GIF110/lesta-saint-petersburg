import Skeleton from "@mui/material/Skeleton";
import type { Vehicle } from "core/types";
import Grid from "@mui/material/Grid";
import { VehicleCard } from "./VehicleCard";

interface VehiclesListProps {
  loading: boolean;
  skeletonCount: number;
  items: Array<Vehicle>;
}

const getArrayOfLong = (long: number): Array<number> => {
  const template: Array<number> = [];
  for (let index = 0; index < long; index += 1) {
    template.push(index);
  }
  return template;
};

export const VehiclesList = ({
  loading,
  skeletonCount,
  items,
}: VehiclesListProps) => {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {getArrayOfLong(skeletonCount).map((i) => (
          <Grid item xs={12} md={6} key={i}>
            <Skeleton key={i} variant="rounded" height={282} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!loading && !items.length) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          К сожалению ничего не нашлось
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {items.map((vehicle) => (
        <Grid item xs={12} lg={6} key={vehicle.id}>
          <VehicleCard {...vehicle} />
        </Grid>
      ))}
    </Grid>
  );
};
