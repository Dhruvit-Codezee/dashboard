import { Skeleton as MuiSkeleton, Stack } from "@mui/material";

export const Skeleton = ({ label }) => {
  return (
    <Stack gap="10px">
      {label && (
        <MuiSkeleton
          width={120}
          height="23px"
          sx={{
            transform: "scale(1)",
          }}
        />
      )}
      <MuiSkeleton
        height="40px"
        sx={{
          transform: "scale(1)",
        }}
      />
    </Stack>
  );
};
