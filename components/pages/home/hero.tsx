import {
  type IconType,
  SiGithub,
  SiGmail,
  SiInstagram,
  SiLinkedin,
  SiX,
} from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface Social {
  name: string
  icon: IconType
  url: string
}

const socials: Social[] = [
  {
    name: 'Github',
    icon: SiGithub,
    url: 'https://github.com/izakdvlpr',
  },
  {
    name: 'X',
    icon: SiX,
    url: 'https://x.com/izakdvlpr',
  },
  {
    name: 'Instagram',
    icon: SiInstagram,
    url: 'https://instagram.com/izakdvlpr',
  },
  {
    name: 'Linkedin',
    icon: SiLinkedin,
    url: 'https://linkedin.com/in/izakdvlpr',
  },
  {
    name: 'Gmail',
    icon: SiGmail,
    url: 'malito:izakdvlpr@gmail.com',
  },
]

export function Hero() {
  return (
    <section className="my-28 flex items-center justify-between">
      <div className="flex flex-col gap-4">
        <p className="text-4xl font-bold">Hey, i'm Izak.</p>

        <p className="w-[400px] text-xl">
          Full Stack Developer. Passionate about programming, technology and
          pizza.
        </p>

        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <Button
              type="button"
              size="icon"
              variant="outline"
              key={social.name}
              asChild
            >
              <Link href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="text-white" />
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <Image
        src="https://github.com/izakdvlpr.png"
        alt="avatar"
        width={200}
        height={200}
        priority
        className="w-52 h-52 rounded-full"
      />
    </section>
  )
}
