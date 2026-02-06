import type { HTMLAttributes, PropsWithChildren } from 'react'

type MDXHeadingProps = PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>

export function MDXHeading1({ children, ...rest }: MDXHeadingProps) {
  return (
    <p className="text-3xl font-bold text-black" {...rest}>
      {children}
    </p>
  )
}

export function MDXHeading2({ children, ...rest }: MDXHeadingProps) {
  return (
    <p className="text-2xl font-bold text-black" {...rest}>
      {children}
    </p>
  )
}

export function MDXHeading3({ children, ...rest }: MDXHeadingProps) {
  return (
    <p className="text-xl font-bold text-black" {...rest}>
      {children}
    </p>
  )
}
