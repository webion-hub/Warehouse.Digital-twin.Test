import { Box, ButtonBase, alpha, useTheme } from "@mui/material";
import { memo, useState } from "react";

type ShelfCellProps = {
  readonly selected?: boolean;
  readonly onClick?: () => void;
}

function ShelfCellComp({selected, onClick}: ShelfCellProps) {
  const [isSelected, setIsSelected] = useState(selected)
  const theme = useTheme();

  const color = isSelected 
    ? theme.palette.primary.main 
    : '#000'

  const opacity = isSelected
    ? 0.6
    : 0.1

  return (
    <Box
      component={ButtonBase}
      onClick={() => {
        setIsSelected(!isSelected)
        onClick?.()
      }}
      sx={{
        margin: 0.25,
        borderRadius: 1,
        width: 20,
        height: 20,
        backgroundColor: alpha(color, opacity),
        "&:hover": {
          cursor: 'pointer',
          backgroundColor: alpha(color, opacity + 0.2),
        },
      }}
    />
  )
}

export const ShelfCell = memo(ShelfCellComp)