import React from "react";

import { withBaseIcon } from "react-icons-kit";
import { image } from "react-icons-kit/icomoon/image";
import { location } from "react-icons-kit/icomoon/location";
import { bin } from "react-icons-kit/icomoon/bin";
import { checkmark } from "react-icons-kit/icomoon/checkmark";
import { clock } from "react-icons-kit/icomoon/clock";

const SideIconContainer = withBaseIcon({
  size: "20px",
  style: { color: "#666666" }
});
export const ImageIcon = () => <SideIconContainer icon={image} />;
export const LocationIcon = () => <SideIconContainer icon={location} />;
export const DiscardIcon = () => <SideIconContainer icon={bin} />;
export const SaveIcon = () => <SideIconContainer icon={checkmark} />;
export const TimeIcon = () => <SideIconContainer icon={clock} />;
