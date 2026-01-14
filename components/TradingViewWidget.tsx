"use client";

// TradingViewWidget.jsx
import React, { memo } from "react";
import useTradeviewWidget from "@/hooks/useTradeviewWidget";

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  className?: string;
  height?: number;
}

const TradingViewWidget = ({
  title,
  scriptUrl,
  config,
  className,
  height = 600,
}: TradingViewWidgetProps) => {
  const containerRef = useTradeviewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">
      {title && <h3 className="font-semibold text-2xl text-gray-400 mb-5">{title}</h3>}
      <div
        className="{cn(tradingview-widget-container, className)}"
        ref={containerRef}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height, width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
