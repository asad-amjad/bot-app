import { Tooltip as ReactTooltip } from "react-tooltip";
import { useId } from "react";

// Reusable Tooltip wrapper component
// eslint-disable-next-line react/prop-types
const Tooltip = ({ children, content, place = "top", ...props }) => {
  const tooltipId = useId(); // Generate a unique ID for the tooltip

  return (
    <>
      <div data-tooltip-id={tooltipId} style={{ display: "inline-block" }}>
        {children}
      </div>
      <ReactTooltip id={tooltipId} place={place} content={content} {...props} />
    </>
  );
};

export default Tooltip;
