import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-10 flex items-center justify-center">
      <p>
        Made with ♥ by{' '}
        <Link
          href="https://github.com/izakdvlpr"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {'  '}
          Izak
        </Link>
      </p>
    </footer>
  )
}
