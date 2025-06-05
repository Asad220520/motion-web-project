import "./Button.scss";
import classNames from "classnames";
import Icon from "@/components/Icon";

const Button = ({
  className,
  type = "button",
  href,
  target,
  mode = "",
  label,
  isLabelHidden = false,
  iconName,
  iconPosition = "before",
  hasFillIcon,
}) => {
  const isLink = href !== undefined;
  const Component = isLink ? "a" : "button";
  const specificProps = isLink ? { href, target } : { type };
  const title = isLabelHidden ? label : undefined;

  const iconComponent = iconName && (
    <Icon className="button__icon" name={iconName} hasFill={hasFillIcon} />
  );

  return (
    <Component
      className={classNames(className, "button", {
        [`button--${mode}`]: mode,
      })}
      title={title}
      aria-label={title}
      {...specificProps}
    >
      {iconPosition === "before" && iconComponent}
      {!isLabelHidden && <span className="button__label">{label}</span>}
      {iconPosition === "after" && iconComponent}
    </Component>
  );
};

export default Button;
