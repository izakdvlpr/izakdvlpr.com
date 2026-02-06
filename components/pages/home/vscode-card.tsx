import { Code } from 'lucide-react'
import Image from 'next/image'

import type { Vscode } from './activities'

interface VscodeCardProps {
  vscode: Vscode
}

export function VscodeCard({ vscode }: VscodeCardProps) {
  return (
    <div className="h-[150px] p-4 flex flex-col gap-2 rounded-md bg-gray-100">
      <div className="flex items-center gap-2">
        <h1 className="text-md font-medium">Programming</h1>

        <Code size={18} />
      </div>

      <div className="flex gap-4">
        <div className="w-16 h-16 relative">
          <Image
            src={vscode.largeImage}
            alt={vscode.largeText}
            title={vscode.largeText}
            width={64}
            height={64}
            className="w-16 h-16 rounded-md flex-shrink grayscale"
          />

          <Image
            src={vscode.smallImage}
            alt={vscode.smallText}
            title={vscode.smallText}
            width={64}
            height={64}
            className="absolute bottom-[-5px] right-[-5px] w-6 h-6 rounded-full grayscale"
          />
        </div>

        <div className="max-w-[300px] flex flex-col truncate">
          <h1 className="text-lg font-bold">Visual Studio Code</h1>

          <p className="text-sm text-ellipsis overflow-hidden">
            {vscode.details}
          </p>

          <p className="text-sm text-ellipsis overflow-hidden">
            {vscode.state}
          </p>

          <p className="text-sm">{vscode.time}</p>
        </div>
      </div>
    </div>
  )
}
