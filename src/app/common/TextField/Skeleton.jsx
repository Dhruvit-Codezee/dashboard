import { Skeleton as MuiSkeleton, Stack } from "@mui/material";

export const Skeleton = ({ rows }) => {
  const height = rows === undefined ? 40 : rows * 23;

  return (
    <Stack gap="10px">
      <MuiSkeleton
        width={120}
        height="23px"
        sx={{
          transform: "scale(1)",
        }}
      />
      <MuiSkeleton
        height={`${height}px`}
        sx={{
          transform: "scale(1)",
        }}
      />
    </Stack>
  );
};
