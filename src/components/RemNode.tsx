// src/components/RemNode.tsx
import React, { useState } from "react";

interface RemNodeProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  defaultCollapsed?: boolean;
}

export const RemNode: React.FC<RemNodeProps> = ({
  title,
  children,
  defaultCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className="rem-node">
      <div className="rem-header">
        {/* Toggle Triangle */}
        <span
          className={`rem-toggle ${hasChildren ? "visible" : ""} ${
            isCollapsed ? "closed" : ""
          }`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          ▶
        </span>

        {/* Bullet Point */}
        <span className="rem-bullet">•</span>

        {/* Content/Title */}
        <div className="rem-content">{title}</div>
      </div>

      {/* Nested Children */}
      {hasChildren && !isCollapsed && (
        <div className="rem-children animate-slide-down">{children}</div>
      )}
    </div>
  );
};
