import { FullscreenLoading } from "@/compoents/FullscreenLoading";
import { Fab } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

const EditWareHouseDialog = dynamic(() => import("./EditWareHouseDialog").then(m => m.EditWareHouseDialog), {
  ssr: false,
  loading: () => <FullscreenLoading />,
});

export function EditWareHouse() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        variant="extended"
        color="primary"
        aria-label="edit"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        Modifica
      </Fab>
      {
        open && (
          <EditWareHouseDialog 
            onClose={() => setOpen(false)} 
          />
        )
      }
    </>
  );
}