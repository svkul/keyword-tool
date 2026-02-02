import { Info } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useTextStore } from "@/store/useTextStore";
import { StatusBar } from "../status-bar/StatusBar";

type TextBlockProps = {
  lastOperationTime?: number;
};

export const TextBlock = ({ lastOperationTime }: TextBlockProps) => {
  const original = useTextStore((s) => s.original);
  const present = useTextStore((s) => s.history.present);
  const setOriginal = useTextStore((s) => s.setOriginal);

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

      <div className="flex flex-1 min-h-0 gap-2">
        <Textarea
          name="keywords"
          className="flex-1 min-h-0 overflow-auto [field-sizing:normal]"
          placeholder="Enter keywords into the box - 1 per line."
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
        />

        <Textarea
          name="result"
          className="flex-1 min-h-0 overflow-auto [field-sizing:normal]"
          placeholder="Result will appear here..."
          disabled
          value={present}
        />
      </div>

      <StatusBar lastOperationTime={lastOperationTime} />
    </div>
  );
};
