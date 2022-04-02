import { Html } from "@react-three/drei";
import { ReactNode } from "react";
import { HtmlProps } from "@react-three/drei/web/Html";

export default function Marker({
  children,
  invisible,
  ...props
}: {
  invisible?: boolean;
  children: ReactNode;
} & HtmlProps) {
  return (
    // @ts-ignore
    <Html
      transform
      distanceFactor={1}
      style={{
        // transition: "all 0.3s",
        opacity: invisible ? 0 : 1,
      }}
      {...props}
    >
      {children}
    </Html>
  );
}
