import { createPortal } from "react-dom";

import { Backdrop, CircularProgress } from "@mui/material";

interface FullscreenLoadingProps {
  hideBackdrop?: boolean;
}

export function FullscreenLoading(props: FullscreenLoadingProps) {
  return createPortal(
    <Backdrop
      open
      sx={{
        background: props.hideBackdrop ? 'transparent' : undefined,
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>,
    document.body
  )
}
