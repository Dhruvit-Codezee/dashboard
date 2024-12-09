import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
export const PageLoader = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CircularProgress
            variant="determinate"
            sx={{
              color: (theme) => theme.palette.grey[200],
            }}
            size={60}
            thickness={4}
            value={100}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
              // color: (theme) => theme.palette.app?.color.butterflyBlue[900],
              animationDuration: "400ms",
              position: "absolute",
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
            size={60}
            thickness={4}
          />
        </Box>
      </Box>
    </>
  );
};
