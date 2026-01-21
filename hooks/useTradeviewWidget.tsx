'use client';
import { useEffect, useRef }     from "react";

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        if (containerRef.current.dataset.loaded || containerRef.current.dataset.loading) return;

        containerRef.current.dataset.loading = 'true';
        containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px;"></div>`;

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = scriptUrl;
        script.async = true;
        script.innerHTML = JSON.stringify(config);

        script.onload = () => {
            if (!containerRef.current) return;
            containerRef.current.dataset.loaded = 'true';
            delete containerRef.current.dataset.loading;
        };

        script.onerror = () => {
            if (!containerRef.current) return;
            containerRef.current.innerHTML = `<div style="padding:12px;color:#9ca3af;font-size:14px;">Failed to load TradingView widget.</div>`;
            delete containerRef.current.dataset.loading;
            delete containerRef.current.dataset.loaded;
        };

        containerRef.current.appendChild(script);

        return () => {
            if(containerRef.current) {
                containerRef.current.innerHTML = '';
                delete containerRef.current.dataset.loaded;
                delete containerRef.current.dataset.loading;
            }
        }
    }, [scriptUrl, config, height])

    return containerRef;
}
export default useTradingViewWidget