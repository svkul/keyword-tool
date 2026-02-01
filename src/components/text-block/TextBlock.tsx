import { Info } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const TextBlock = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <h1>Keyword Tool</h1>


        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4" />
          </TooltipTrigger>

          <TooltipContent className="max-w-xs">
            <ol className="list-decimal list-inside">
              <li>
                <span>Enter keywords into the box - 1 per line.</span>
              </li>
              <li>
                <span>Check one or more of the 'Auto' options (optional).</span>
              </li>
              <li>
                <span>Click a button to edit the keywords.</span>
              </li>
              <li>
                <span>Hover your mouse cursor over a button for helpful hints.</span>
              </li>
              <li>
                <span>Click on the AdWords and Find/Replace tabs for more functions.</span>
              </li>
            </ol>
          </TooltipContent>
        </Tooltip>
      </div>

      <Textarea className="w-full flex-1" placeholder="Enter keywords into the box - 1 per line." />
    </div>
  )
}