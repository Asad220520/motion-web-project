import classNames from "classnames";
import "./Icon.scss";

import { FiSearch, FiBell, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import googleIcon from "../../assets/icons/google.svg"; 
import facebookIcon from "../../assets/icons/facebook.svg"; 

const iconMap = {
  search: FiSearch,
  notification: FiBell,
  ArrowRight: FiArrowRight,
  ArrowLeft: FiArrowLeft,
  google: () => (
    <img src={googleIcon} alt="Google" width={24} height={24} />
  ),
  facebook: () => (
    <img src={facebookIcon} alt="Facebook" width={24} height={24} />
  ),
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
