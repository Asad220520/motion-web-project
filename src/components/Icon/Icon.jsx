import classNames from "classnames";
import "./Icon.scss";

import { FiSearch, FiBell } from "react-icons/fi";

const iconMap = {
  search: FiSearch,
  notification: FiBell,
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
