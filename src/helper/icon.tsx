import Icon, { IconProps } from "@chakra-ui/icon";
import React from "react";

export const ShareIcon: React.FC<IconProps> = (props: IconProps) => (
  <Icon {...props}>
    <svg viewBox="0 -22 512 511" xmlns="http://www.w3.org/2000/svg">
      <path d="m512 233.820312-212.777344-233.320312v139.203125h-45.238281c-140.273437 0-253.984375 113.710937-253.984375 253.984375v73.769531l20.09375-22.019531c68.316406-74.851562 164.980469-117.5 266.324219-117.5h12.804687v139.203125zm0 0" />
    </svg>
  </Icon>
);

export default { ShareIcon };
