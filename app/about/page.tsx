import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Isaque Lima » About',
}

export default function AboutPage() {
  function getAge() {
    const birthDate = new Date('2003-04-01')
    const today = new Date()
    
    let age = today.getFullYear() - birthDate.getFullYear()
    
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }
  
  return (
    <main className="mt-10 flex flex-col gap-4 mixin/text:multi-[text-lg;text-black]">
      <h1 className="text-3xl font-bold">About</h1>

      <p className="mixin/text">
        My name is Isaque Lima, I am{' '} {getAge()}{' '}
        years old and I am a Systems Analyst. I am passionate about
        technology and programming, and I graduated in Systems Analysis
        and Development from the University of Vila Velha.
      </p>

      <p className="mixin/text">
        I started my career as a developer in 2018 and have accumulated
        experience with several technologies, including TypeScript, React and
        Node.js. I currently work at{' '}
        <a 
          href="https://strim.com.br" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline hover:text-blue-600 transition-colors"
        >
          Strim
        </a>, an asset integrity startup. Throughout my career, I have participated in projects involving
        the development of modern web applications, integrations with APIs and
        scalable solutions.
      </p>

      <p className="mixin/text">
        I am interested in learning new technologies, especially those focused
        on software architecture, performance and fullstack development. In
        addition, I constantly seek to improve my skills to create practical and
        innovative solutions that positively impact people and companies.
      </p>
    </main>
  )
}
