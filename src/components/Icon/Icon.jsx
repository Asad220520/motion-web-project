import classNames from "classnames";
import "./Icon.scss";

import { FiSearch, FiBell, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { CgGoogle, CgFacebook } from "react-icons/cg";
const iconMap = {
  search: FiSearch,
  notification: FiBell,
  ArrowRight: FiArrowRight,
  ArrowLeft: FiArrowLeft,
  leFill: CgGoogle,
  Facebook: CgFacebook,
};

const Icon = ({ className, name, hasFill = false }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  return (
    <span className={classNames(className, "icon")}>
      <IconComponent
        className="icon__svg"
        color="currentColor"
        fill={hasFill ? "currentColor" : "none"}
        stroke={hasFill ? "none" : "currentColor"}
        size={24}
      />
    </span>
  );
};

export default Icon;
