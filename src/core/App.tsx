import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import type { URLSearchParams } from "url";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { ALL_VEHICLES } from "apollo";
import type { Vehicle } from "core/types";
import { VehiclesList, Filter, Header, DrawerBottom } from "core/components";
import { levelOptions, classOptions, nationOptions } from "../data";
import "styles/main.css";

type VehiclesQuery = {
  vehicles: Array<Vehicle>;
};

const entries = (params: URLSearchParams) =>
  Object.fromEntries(params.entries());

const App = () => {
  const { breakpoints } = useTheme();
  const breakpointSm = useMediaQuery(breakpoints.up("sm"));

  const { data, loading } = useQuery<VehiclesQuery>(ALL_VEHICLES);
  const [filterParams, setFilterParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const perPage = 12;
  const currentPage = filterParams.get("page") ?? "1";
  const [pageCount, setPageCount] = useState(1);

  const onPageChange = (_event: ChangeEvent<unknown>, page: number) => {
    filterParams.set("page", page.toString());
    setFilterParams(filterParams);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (data?.vehicles) {
      const {
        page = "1",
        level,
        nation,
        class: classVehicles,
      } = entries(filterParams);

      let items = [...data.vehicles];
      const lastItemIndex = parseInt(page, 10) * perPage;
      const firstItemIndex = lastItemIndex - perPage;

      if (level) {
        items = items.filter(
          (vehicle) => vehicle.level === parseInt(level, 10)
        );
        filterParams.set("page", "1");
        setFilterParams(filterParams);
      }

      if (nation) {
        items = items.filter((vehicle) => vehicle.nation.name === nation);
        filterParams.set("page", "1");
        setFilterParams(filterParams);
      }

      if (classVehicles) {
        items = items.filter((vehicle) => vehicle.type.name === classVehicles);
        filterParams.set("page", "1");
        setFilterParams(filterParams);
      }

      setPageCount(Math.ceil(items.length / perPage));
      setVehicles(items.slice(firstItemIndex, lastItemIndex));
    }
  }, [filterParams, data, setFilterParams]);

  return (
    <>
      <Header />

      <Container sx={{ paddingY: "30px" }} maxWidth="xl">
        <Grid container spacing={2}>
          {breakpointSm && (
            <Grid item xs={12} sm={4} lg={2}>
              <Box position="sticky" top="10px" display="grid" gap="20px">
                <Filter
                  levelOptions={levelOptions}
                  classOptions={classOptions}
                  nationOptions={nationOptions}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} sm={8} lg={10}>
            <VehiclesList
              loading={loading}
              items={vehicles}
              skeletonCount={perPage}
            />

            {pageCount > 0 && (
              <Pagination
                count={pageCount}
                color="primary"
                page={parseInt(currentPage, 10)}
                onChange={onPageChange}
                size="small"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  paddingY: 2,
                }}
              />
            )}
          </Grid>
        </Grid>
      </Container>

      {!breakpointSm && (
        <>
          <DrawerBottom onToggle={toggleDrawer} drawerOpen={drawerOpen}>
            <CardContent sx={{ display: "grid", gap: "20px" }}>
              <Filter
                levelOptions={levelOptions}
                classOptions={classOptions}
                nationOptions={nationOptions}
              />
            </CardContent>
          </DrawerBottom>
        </>
      )}
    </>
  );
};

export default App;
