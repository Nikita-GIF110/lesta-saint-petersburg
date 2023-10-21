import type { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { Vehicle } from "core/types";

export const VehicleCard = (vehicle: Vehicle) => {
  const { breakpoints } = useTheme();

  const CardSx: SxProps = {
    position: "relative",

    "&:hover": {
      "& > [data-content='image']::before": {
        opacity: 0.5,
      },

      "& > [data-content='description']": {
        transform: "translateY(0)",
      },
    },
  };

  const CardImageHolderSx: SxProps = {
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#000",
      opacity: 0,
      transition: "opacity 0.3s ease-in-out",
      pointerEvents: "none",
    },
    "& img": {
      maxWidth: "100%",
      height: "auto",
    },
  };

  const ChipHolderSx: SxProps = {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    pointerEvents: "none",
    padding: "16px",

    position: "absolute",
    top: 0,
    left: 0,

    [breakpoints.up("md")]: {
      flexDirection: "column",
    },
  };

  const CardDescriptionSx: SxProps = {
    transition: "transform 0.3s ease-in-out",
    backgroundColor: "#fff",

    [breakpoints.down("sm")]: {
      paddingTop: 0,
    },

    [breakpoints.up("sm")]: {
      position: "absolute",
      left: 0,
      bottom: 0,
      right: 0,
      transform: "translateY(100%)",
    },
  };

  return (
    <Card sx={CardSx}>
      <CardContent sx={CardImageHolderSx} data-content="image">
        <picture>
          <source media="(max-width: 799px)" srcSet={vehicle.icons.medium} />
          <img
            src={vehicle.icons.large}
            alt={vehicle.title}
            title={vehicle.title}
          />
        </picture>
      </CardContent>

      <Box sx={ChipHolderSx}>
        <Chip
          color="info"
          variant="filled"
          label={vehicle.title}
          size="small"
        />
        <Chip
          color="info"
          variant="filled"
          label={`Уровень ${vehicle.level}`}
          size="small"
        />
        <Chip
          color="info"
          variant="filled"
          label={`Страна ${vehicle.nation.title}`}
          size="small"
        />
        <Chip
          color="info"
          variant="filled"
          label={`Класс ${vehicle.type.title}`}
          size="small"
        />
      </Box>

      <CardContent sx={CardDescriptionSx} data-content="description">
        <Typography variant="body2">{vehicle.description}</Typography>
      </CardContent>
    </Card>
  );
};
