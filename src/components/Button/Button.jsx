import "./Button.scss";
import classNames from "classnames";
import Icon from "@/components/Icon";
import React, { forwardRef } from "react";

const Button = forwardRef(({
  className,
  type = "button",
  href,
  target,
  mode = "",
  label,
  isLabelHidden = false,
  iconName,
  iconPosition = "after",
  hasFillIcon,
  isBlueLabel,
}, ref) => {
  const isLink = href !== undefined;
  const Component = isLink ? "a" : "button";
  const specificProps = isLink ? { href, target } : { type };
  const title = isLabelHidden ? label : undefined;
  const iconComponent =
    iconName && (
      <Icon className="button__icon" name={iconName} hasFill={hasFillIcon} />
    );

  return (
    <Component
      ref={ref}
      className={classNames(className, "button", {
        [`button--${mode}`]: mode,
        "button--circle": mode === "circle",
      })}
      title={title}
      aria-label={title}
      {...specificProps}
    >
      {iconPosition === "before" && iconComponent}
      {!isLabelHidden && (
        <span
          className={classNames("button__label", {
            "button__label--blue": isBlueLabel,
          })}
        >
          {label}
        </span>
      )}
      {iconPosition === "after" && iconComponent}
    </Component>
  );
});

export default Button;