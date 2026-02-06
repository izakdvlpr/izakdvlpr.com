'use client'

import { cn } from '@/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { title: 'About', href: '/about' },
  { title: 'Blog', href: '/blog' },
  { title: 'Projects', href: '/projects' },
  { title: 'Setup', href: '/setup' },
  { title: 'Contact', href: '/contact' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <h1 className="text-2xl font-bold">
          izak<span className="text-black">dvlpr</span>
        </h1>
      </Link>

      <nav className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'text-black',
              pathname.startsWith(link.href) && 'font-bold text-black',
            )}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </header>
  )
}
