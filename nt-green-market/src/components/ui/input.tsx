"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

function Input({ className, label, error, hint, id, ...props }: InputProps) {
  const [focused, setFocused] = useState(false)
  const hasValue = Boolean(props.value ?? props.defaultValue)
  const floatLabel = focused || hasValue || Boolean(props.placeholder)

  return (
    <div className="relative w-full">
      <input
        id={id}
        className={cn(
          "peer w-full min-h-[64px] px-4 pt-7 pb-2 bg-gray-50 text-base text-gray-900",
          "border-0 border-b-2 border-gray-200",
          "transition-colors duration-[150ms] ease-default outline-none",
          "placeholder:text-transparent",
          "focus:border-b-2 focus:border-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-error focus:border-error",
          className
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={label ?? " "}
        {...props}
      />
      {/* Gradient bottom border on focus */}
      {!error && (
        <span
          className={cn(
            "absolute bottom-0 left-0 h-0.5 w-full transition-opacity duration-[150ms]",
            focused ? "opacity-100" : "opacity-0"
          )}
          style={{ background: "var(--gradient-brand)" }}
        />
      )}
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 transition-all duration-[150ms] pointer-events-none",
            "peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500",
            floatLabel ? "top-2 text-xs text-gray-500" : "top-4 text-base text-gray-400"
          )}
        >
          {label}
        </label>
      )}
      {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

function Select({ className, label, error, id, options, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        id={id}
        className={cn(
          "peer w-full min-h-[64px] px-4 pt-7 pb-2 bg-gray-50 text-base text-gray-900",
          "border-0 border-b-2 border-gray-200 appearance-none",
          "transition-colors duration-[150ms] ease-default outline-none cursor-pointer",
          "focus:border-primary",
          error && "border-error focus:border-error",
          className
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {/* Gradient bottom border on focus */}
      {!error && (
        <span
          className="absolute bottom-0 left-0 h-0.5 w-full opacity-0 peer-focus:opacity-100 transition-opacity duration-[150ms]"
          style={{ background: "var(--gradient-brand)" }}
        />
      )}
      {label && (
        <label
          htmlFor={id}
          className="absolute left-4 top-2 text-xs text-gray-500 pointer-events-none"
        >
          {label}
        </label>
      )}
      {/* Chevron */}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
    </div>
  )
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn("block text-sm font-medium text-gray-700 mb-1.5", className)}
      {...props}
    />
  )
}

interface FormFieldProps {
  children: React.ReactNode
  className?: string
}

function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {children}
    </div>
  )
}

export { Input, Select, Label, FormField }
