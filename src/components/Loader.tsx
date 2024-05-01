import { BallTriangle, Oval } from "react-loader-spinner";

export const Loader = ({
  height = 100,
  width = 100,
  color = "#3A44E4",
  compact = true,
}: {
  height?: number;
  width?: number;
  color?: string;
  compact?: boolean;
}) => {
  return compact ? (
    <Oval
      visible={true}
      height={height}
      width={width}
      color={color}
      secondaryColor={`${color}60`}
      ariaLabel="circles-loading"
      wrapperStyle={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      // firstLineColor=""
      // middleLineColor=""
      // lastLineColor=""
    />
  ) : (
    <BallTriangle
      visible={true}
      height={height}
      width={width}
      color={color}
      radius={5}
      ariaLabel="circles-loading"
      wrapperStyle={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      // firstLineColor=""
      // middleLineColor=""
      // lastLineColor=""
    />
  );
};
