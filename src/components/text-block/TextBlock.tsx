import { Info } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { StatusBar } from "../status-bar/StatusBar";

type TextBlockProps = {
  originalText: string;
  resultText: string;
  setText: (text: string) => void;
  lastOperationTime?: number;
};

export const TextBlock = ({ originalText, resultText, setText, lastOperationTime }: TextBlockProps) => {
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

      <div className="flex flex-1 gap-2">
        <Textarea
          name="keywords"
          className="flex-1"
          placeholder="Enter keywords into the box - 1 per line."
          value={originalText}
          onChange={e => setText(e.target.value)}
        />

        <Textarea
          name="result"
          className="flex-1"
          placeholder="Result will appear here..."
          disabled
          value={resultText}
        />
      </div>

      <StatusBar originalText={originalText} resultText={resultText} lastOperationTime={lastOperationTime} />
    </div>
  )
}