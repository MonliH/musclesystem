import { Button, ButtonProps, Tooltip, forwardRef } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ToolTipButtonProps extends ButtonProps {
  children: ReactNode;
  label: string;
}
const ToolTipButton = forwardRef<ToolTipButtonProps, "a">(
  function ChakraLinkButton(
    { label, children, ...props }: ToolTipButtonProps,
    ref
  ) {
    return (
      <Tooltip label={label}>
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </Tooltip>
    );
  }
);
export default ToolTipButton;
