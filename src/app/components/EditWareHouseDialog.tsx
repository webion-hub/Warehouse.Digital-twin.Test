import { CELL_SIZE, WAREHOUSE_HEIGHT, WAREHOUSE_SIZE } from "@/data/sizes";
import { Shelf, useWarehouse } from "@/states/useWarehouse";
import { Button, Dialog, DialogActions, DialogContent, Stack } from "@mui/material";
import { useRef } from "react";
import { ShelfCell } from "./ShelfCell";

type EditWareHouseDialogProps = {
  readonly onClose: () => void;
};

export function EditWareHouseDialog({ onClose }: EditWareHouseDialogProps) {
  const { shelfs, setShelfs } = useWarehouse();
  const shelfsRef = useRef<Shelf[]>(shelfs);

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="xl"
    >
      <DialogContent>
        <Stack
          direction="row"
        >
          {
            [...Array(WAREHOUSE_SIZE / CELL_SIZE)]
              .map((_, i) => (
                <Stack
                  key={i}
                  direction="column"
                >
                  {
                    [...Array(WAREHOUSE_SIZE / CELL_SIZE)]
                      .map((_, j) => (
                        <ShelfCell
                          key={`${i}-${j}`}
                          selected={shelfsRef.current.some(s => s.x === i && s.y === j)}
                          onClick={() => {
                            shelfsRef.current = shelfsRef.current.some(s => s.x === i && s.y === j)
                              ? shelfsRef.current.filter(s => s.x !== i || s.y !== j)
                              : [...shelfsRef.current, { x: i, y: j, floors: Array(WAREHOUSE_HEIGHT).fill({ filled: false }) }];
                          }}
                        />
                      ))
                  }
                </Stack>
              ))
          }
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          position: 'sticky'
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Cancella
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setShelfs(shelfsRef.current);
            onClose();
          }}
        >
          Salva
        </Button>
      </DialogActions>
    </Dialog>
  )
}