"use client";

import { useState, useRef, useCallback } from "react";

export function LiquidGlass({
    children,
    className = "",
    style,
    variant = "card",
    rippleEffect = true,
    flowOnHover = true,
    stretchOnDrag = true,
    onClick,
    onDragStart,
    onDragEnd,
}) {
    const [isJiggling, setIsJiggling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [wobbleOffset, setWobbleOffset] = useState({ x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [ripples, setRipples] = useState([]);
    const elementRef = useRef(null);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const rippleCounter = useRef(0);

    const getVariantClasses = () => {
        const baseClasses = "liquid-glass relative overflow-hidden";

        switch (variant) {
            case "button":
                return `${baseClasses} px-6 py-3 rounded-2xl cursor-pointer select-none`;
            case "card":
                return `${baseClasses} p-6 rounded-3xl`;
            case "panel":
                return `${baseClasses} p-8 rounded-2xl`;
            case "floating":
                return `${baseClasses} p-4 rounded-full shadow-2xl`;
            default:
                return baseClasses;
        }
    };

    const createRipple = useCallback(
        (e) => {
            if (!rippleEffect || !elementRef.current) return;

            const rect = elementRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const newRipple = {
                id: rippleCounter.current++,
                x,
                y,
            };

            setRipples((prev) => [...prev, newRipple]);

            setTimeout(() => {
                setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
            }, 600);
        },
        [rippleEffect]
    );

    const handleMouseDown = useCallback(
        (e) => {
            if (stretchOnDrag) {
                setIsDragging(true);
                dragStartPos.current = { x: e.clientX, y: e.clientY };
                onDragStart?.();
            } else if (variant === "button") {
                setIsPressed(true);
            }

            createRipple(e);
        },
        [stretchOnDrag, onDragStart, createRipple, variant]
    );

    const handleMouseMove = useCallback(
        (e) => {
            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                setCursorPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }

            if (!isDragging) return;

            const deltaX = e.clientX - dragStartPos.current.x;
            const deltaY = e.clientY - dragStartPos.current.y;

            setDragOffset({ x: deltaX * 0.1, y: deltaY * 0.1 });
        },
        [isDragging]
    );

    const handleMouseUp = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);

            const currentOffset = { ...dragOffset };
            setWobbleOffset(currentOffset);

            setDragOffset({ x: 0, y: 0 });
            onDragEnd?.();

            setIsJiggling(true);
            setTimeout(() => {
                setIsJiggling(false);
                setWobbleOffset({ x: 0, y: 0 });
            }, 1800);
        } else if (variant === "button" && isPressed) {
            setIsPressed(false);
            setWobbleOffset({ x: 0, y: 0 });
            setIsJiggling(true);
            setTimeout(() => setIsJiggling(false), 1800);
        }
    }, [isDragging, dragOffset, onDragEnd, variant, isPressed]);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleClick = useCallback(
        (e) => {
            createRipple(e);
            onClick?.();
        },
        [onClick, createRipple]
    );

    // Touch event handlers
    const handleTouchStart = useCallback(
        (e) => {
            const touch = e.touches[0];
            if (stretchOnDrag) {
                setIsDragging(true);
                dragStartPos.current = { x: touch.clientX, y: touch.clientY };
                onDragStart?.();
            } else if (variant === "button") {
                setIsPressed(true);
            }

            // Create ripple effect for touch
            if (rippleEffect && elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;

                const newRipple = {
                    id: rippleCounter.current++,
                    x,
                    y,
                };

                setRipples((prev) => [...prev, newRipple]);

                setTimeout(() => {
                    setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
                }, 600);
            }
        },
        [stretchOnDrag, onDragStart, rippleEffect, variant]
    );

    const handleTouchMove = useCallback(
        (e) => {
            const touch = e.touches[0];

            if (elementRef.current) {
                const rect = elementRef.current.getBoundingClientRect();
                setCursorPos({
                    x: touch.clientX - rect.left,
                    y: touch.clientY - rect.top,
                });
            }

            if (!isDragging) return;

            // Prevent scrolling when dragging
            e.preventDefault();

            const deltaX = touch.clientX - dragStartPos.current.x;
            const deltaY = touch.clientY - dragStartPos.current.y;

            setDragOffset({ x: deltaX * 0.1, y: deltaY * 0.1 });
        },
        [isDragging]
    );

    const handleTouchEnd = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);

            const currentOffset = { ...dragOffset };
            setWobbleOffset(currentOffset);

            setDragOffset({ x: 0, y: 0 });
            onDragEnd?.();

            setIsJiggling(true);
            setTimeout(() => {
                setIsJiggling(false);
                setWobbleOffset({ x: 0, y: 0 });
            }, 1800);
        } else if (variant === "button" && isPressed) {
            setIsPressed(false);
            setWobbleOffset({ x: 0, y: 0 });
            setIsJiggling(true);
            setTimeout(() => setIsJiggling(false), 1800);
        }
    }, [isDragging, dragOffset, onDragEnd, variant, isPressed]);

    const transformStyle = isJiggling
        ? {
              "--wobble-start-x": `${wobbleOffset.x}px`,
              "--wobble-start-y": `${wobbleOffset.y}px`,
          }
        : {
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) ${isDragging ? "scale(1.02)" : ""}`,
              transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
          };

    return (
        <div
            ref={elementRef}
            className={`
        ${getVariantClasses()}
        ${isJiggling && variant === "button" ? "liquid-wobble-active" : ""}
        ${isPressed && variant === "button" ? "liquid-pressed" : ""}
        ${className}
      `}
            style={{ ...transformStyle, ...style }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
                setIsHovering(false);
                setIsPressed(false);
                handleMouseUp();
            }}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}>
            {isHovering && flowOnHover && (
                <div
                    className="absolute pointer-events-none transition-opacity duration-300"
                    style={{
                        left: cursorPos.x,
                        top: cursorPos.y,
                        width: "120px",
                        height: "120px",
                        background:
                            "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 30%, rgba(255, 255, 255, 0.05) 70%, transparent 100%)",
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)",
                        filter: "blur(8px)",
                        zIndex: 2,
                    }}
                />
            )}

            {ripples.map((ripple) => (
                <div
                    key={ripple.id}
                    className="absolute pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--liquid-ripple-color)",
                        transform: "translate(-50%, -50%)",
                        animation: "liquidRipple 0.6s ease-out forwards",
                        zIndex: 3,
                    }}
                />
            ))}

            <div className="relative z-10">{children}</div>
        </div>
    );
}
