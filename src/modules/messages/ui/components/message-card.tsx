import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
// import { Typewriter } from "react-simple-typewriter";
import "highlight.js/styles/atom-one-dark.css"; // or any other theme like atom-one-dark
import { Button } from "@/components/ui/button";
import { CopyIcon, Share2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Message } from "ai";
import React from "react";
import { MemoizedMarkdown } from "@/components/memoized-markdown";

export const MessagesCard = ({ role, content }: Message) => {
  if (role === "user") {
    return <UserMessage content={content} />;
  } else {
    return <AssistantMessage content={content} />;
  }
};

const UserMessage = ({ content }: { content: string }) => {
  return (
    <div className="w-full flex justify-end text-[15px] mb-20">
      <Card className="shadow-none w-fit max-w-[60%] py-2 px-4 rounded-md! bg-primary/70 text-white border-primary/30">
        {content}
      </Card>
    </div>
  );
};

const AssistantMessage = React.memo(
  ({
    content,
  }: // isTypewriter,
  {
    content: string;
  }) => {
    const markdown = content;

    return (
      <div
        className={cn(
          "flex flex-col group px-2 pb-4 max-w-[70%] text-[16px] mb-10"
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={`/logo.svg`}
            alt="vibe"
            width={18}
            height={18}
            className="shrink-0"
          />
          <span className="text-sm font-medium">Vanguox</span>
          <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 font-medium">
            {format(Date.now(), "HH:mm 'on' MM dd, yyyy")}
          </span>
        </div>

        <div className="w-full flex justify-start flex-col gap-y-2">
          <Card
            className={cn(
              "shadow-none text-[15px] bg-transparent dark:bg-neutral-900 w-fit p-5 border-none animate-fade-in max-w-full lg:max-w-[600px]"
            )}
          >
            {/* {isTypewriter ? (
            <Typewriter typeSpeed={10} words={[content]} />
          ) : ( */}
            <MemoizedMarkdown content={markdown} id="123456" />
            {/* )} */}
            <div className="h-7 flex justify-start items-center transition-all duration-300">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={`ghost`}
                    size={`icon`}
                    className="cursor-pointer"
                  >
                    <CopyIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy text</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={`ghost`}
                    size={`icon`}
                    className="cursor-pointer"
                  >
                    <Share2Icon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share link</TooltipContent>
              </Tooltip>
            </div>
          </Card>
        </div>
      </div>
    );
  }
);

AssistantMessage.displayName = "AssistantMessage";
