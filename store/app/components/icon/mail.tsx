import type { PropsWithChildren, SVGAttributes } from "react";
import classNames from "classnames";

export const MailIcon = ({
  className,
  ...props
}: PropsWithChildren<SVGAttributes<SVGElement> & { className?: string }>) => (
  <svg
    className={classNames("stroke-current", className)}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);
