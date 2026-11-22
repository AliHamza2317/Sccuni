"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/format";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  /** Optional secondary text on the right, e.g. a count. */
  hint?: string;
}

interface MenuPosition {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
  up: boolean;
  maxHeight: number;
}

const ITEM_HEIGHT = 44;
const MENU_PADDING = 12;
const MENU_MAX = 320;
const GAP = 8;
const TYPEAHEAD_MS = 600;

/** Where the menu goes: below the trigger, or above it when there is more room there. */
function placeMenu(trigger: HTMLElement, count: number, align: "start" | "end", minWidth: number): MenuPosition {
  const r = trigger.getBoundingClientRect();
  const wanted = Math.min(count * ITEM_HEIGHT + MENU_PADDING, MENU_MAX);
  const below = window.innerHeight - r.bottom - GAP - 12;
  const above = r.top - GAP - 12;
  const up = below < wanted && above > below;
  const width = Math.min(Math.max(r.width, minWidth), window.innerWidth - 16);
  const rawLeft = align === "end" ? r.right - width : r.left;
  const left = Math.max(8, Math.min(rawLeft, window.innerWidth - width - 8));
  const maxHeight = Math.max(140, Math.min(MENU_MAX, up ? above : below));
  return up ? { left, width, bottom: window.innerHeight - r.top + GAP, up, maxHeight } : { left, width, top: r.bottom + GAP, up, maxHeight };
}

const TRIGGER = {
  /** A bordered field. */
  field: "h-11 rounded-xl bg-white px-3.5 text-[15px] text-ink-900 shadow-xs ring-1 ring-ink-200 hover:ring-ink-300",
  /** Borderless, for use inside a larger control such as a search bar. */
  inline: "h-full w-full bg-transparent text-[15px] text-ink-700",
};

/**
 * Styled dropdown that replaces the browser's <select>.
 * Follows the WAI-ARIA "select-only combobox" pattern: focus stays on the trigger, the active option
 * is announced with aria-activedescendant, and it supports Arrow keys, Home/End, Page Up/Down,
 * Enter/Space, Escape, Tab and type-ahead. The menu renders in a portal, so containers with
 * overflow: hidden never cut it off, and it opens upwards when there is no room below.
 */
export function Select<T extends string>({
  value,
  onChange,
  options,
  label,
  hideLabel = false,
  icon,
  variant = "field",
  align = "start",
  menuMinWidth = 200,
  className,
  triggerClassName,
}: {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  /** Accessible name; shown above the control unless `hideLabel`. */
  label: string;
  hideLabel?: boolean;
  icon?: ReactNode;
  variant?: keyof typeof TRIGGER;
  align?: "start" | "end";
  menuMinWidth?: number;
  className?: string;
  triggerClassName?: string;
}) {
  const id = useId();
  const labelId = `${id}-label`;
  const listId = `${id}-list`;
  const optionId = (i: number) => `${id}-option-${i}`;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", at: 0 });

  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const selected = options[selectedIndex];
  const last = options.length - 1;

  const openMenu = (index = selectedIndex) => {
    if (!triggerRef.current) return;
    setPosition(placeMenu(triggerRef.current, options.length, align, menuMinWidth));
    setActive(index);
    setOpen(true);
  };
  const choose = (index: number) => {
    const option = options[index];
    if (option && option.value !== value) onChange(option.value);
    setOpen(false);
  };

  // While open: follow the trigger on scroll and resize, and close on a press outside.
  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      if (triggerRef.current) setPosition(placeMenu(triggerRef.current, options.length, align, menuMinWidth));
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !listRef.current?.contains(target)) setOpen(false);
    };
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, options.length, align, menuMinWidth]);

  // Keep the active option visible inside a long menu.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const typing = typeahead.current.text !== "" && Date.now() - typeahead.current.at < TYPEAHEAD_MS;

    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || (e.key === " " && !typing)) {
        e.preventDefault();
        openMenu();
        return;
      }
      if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        openMenu(e.key === "Home" ? 0 : last);
        return;
      }
    } else {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!e.altKey) setActive((i) => Math.min(last, i + 1));
          return;
        case "ArrowUp":
          e.preventDefault();
          if (e.altKey) choose(active);
          else setActive((i) => Math.max(0, i - 1));
          return;
        case "Home":
          e.preventDefault();
          setActive(0);
          return;
        case "End":
          e.preventDefault();
          setActive(last);
          return;
        case "PageDown":
          e.preventDefault();
          setActive((i) => Math.min(last, i + 10));
          return;
        case "PageUp":
          e.preventDefault();
          setActive((i) => Math.max(0, i - 10));
          return;
        case "Enter":
          e.preventDefault();
          choose(active);
          return;
        case " ":
          if (!typing) {
            e.preventDefault();
            choose(active);
            return;
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          return;
        case "Tab":
          choose(active);
          return;
      }
    }

    // Type-ahead: jump to the next option starting with the typed letters.
    if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
      const t = typeahead.current;
      const now = Date.now();
      t.text = now - t.at > TYPEAHEAD_MS ? e.key.toLowerCase() : t.text + e.key.toLowerCase();
      t.at = now;
      const repeated = t.text.split("").every((c) => c === t.text[0]);
      const search = repeated ? t.text[0] : t.text;
      const from = open ? active : selectedIndex;
      const offset = repeated ? 1 : 0;
      for (let k = 0; k < options.length; k++) {
        const i = (from + offset + k) % options.length;
        if (options[i].label.toLowerCase().startsWith(search)) {
          if (open) setActive(i);
          else openMenu(i);
          break;
        }
      }
    }
  };

  return (
    <div className={cn("relative min-w-0", className)}>
      <span id={labelId} className={hideLabel ? "sr-only" : "mb-2 block text-sm font-semibold text-ink-900"}>
        {label}
      </span>
      <div
        ref={triggerRef}
        role="combobox"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex cursor-pointer items-center gap-2 transition-[box-shadow,color] duration-200 select-none",
          TRIGGER[variant],
          open && variant === "field" && "ring-2 ring-brand-500/60",
          triggerClassName,
        )}
      >
        {icon}
        {/* Inside search bars the chevron sits right after the text; in bordered fields it sits at the far end. */}
        <span className={cn("min-w-0 truncate text-left", variant === "field" && "flex-1")}>{selected?.label}</span>
        <ChevronDown className={cn("size-4 shrink-0 text-ink-400 transition-transform duration-200", variant === "inline" && "-ml-0.5", open && "rotate-180 text-ink-700")} aria-hidden />
      </div>

      {open &&
        position &&
        createPortal(
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            tabIndex={-1}
            style={{ position: "fixed", left: position.left, width: position.width, top: position.top, bottom: position.bottom, maxHeight: position.maxHeight }}
            className={cn(
              "animate-pop z-[70] overflow-auto overscroll-contain rounded-2xl bg-white p-1.5 shadow-[0_24px_60px_rgb(0_26_58/0.18)] ring-1 ring-ink-900/[0.08]",
              position.up ? "origin-bottom" : "origin-top",
            )}
          >
            {options.map((o, i) => (
              <li
                key={o.value}
                id={optionId(i)}
                role="option"
                aria-selected={i === selectedIndex}
                data-index={i}
                onPointerDown={(e) => e.preventDefault()}
                onPointerMove={() => i !== active && setActive(i)}
                onClick={() => {
                  choose(i);
                  triggerRef.current?.focus();
                }}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-[14.5px] text-ink-700 transition-colors",
                  i === active && "bg-ink-50 text-ink-950",
                  i === selectedIndex && "font-semibold text-ink-950",
                )}
              >
                <span className="min-w-0 flex-1 leading-snug break-words">{o.label}</span>
                {o.hint ? <span className="shrink-0 text-[12.5px] font-normal text-ink-500">{o.hint}</span> : null}
                <Check className={cn("size-4 shrink-0 text-brand-600", i === selectedIndex ? "opacity-100" : "opacity-0")} aria-hidden />
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
