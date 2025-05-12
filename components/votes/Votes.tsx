"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import { toast } from "@/hooks/use-toast";
import { createVote } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";

interface Params {
  targetType: "question" | "answer";
  targetId: string;
  upvotes: number;
  downvotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({
  upvotes,
  downvotes,
  hasVotedPromise,
  targetId,
  targetType,
}: Params) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(downvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  useEffect(() => {
    hasVotedPromise.then((result) => {
      if (result.success && result.data) {
        setHasUpvoted(result.data.hasUpvoted);
        setHasDownvoted(result.data.hasDownvoted);
      }
    });
  }, [hasVotedPromise]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId)
      return toast({
        title: "Please login to vote",
        description: "Only logged-in users can vote.",
      });

    setIsLoading(true);

    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });

      if (!result.success) {
        return toast({
          title: "Failed to vote",
          description: result.error?.message,
          variant: "destructive",
        });
      }

      if (voteType === "upvote") {
        setHasUpvoted(!hasUpvoted);
        setHasDownvoted(false);
        setLocalUpvotes(localUpvotes + (hasUpvoted ? -1 : 1));
        if (hasDownvoted) setLocalDownvotes(localDownvotes - 1);
      } else {
        setHasDownvoted(!hasDownvoted);
        setHasUpvoted(false);
        setLocalDownvotes(localDownvotes + (hasDownvoted ? -1 : 1));
        if (hasUpvoted) setLocalUpvotes(localUpvotes - 1);
      }

      toast({
        title: `Vote ${voteType} successful`,
        description: "Your vote has been recorded.",
      });
    } catch {
      toast({
        title: "Failed to vote",
        description: "An error occurred while voting. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
          width={18}
          height={18}
          alt="upvote"
          className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
          onClick={() => !isLoading && handleVote("upvote")}
        />
        <p>{formatNumber(localUpvotes)}</p>
      </div>

      <div className="flex-center gap-1.5">
        <Image
          src={hasDownvoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
          width={18}
          height={18}
          alt="downvote"
          className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}
          onClick={() => !isLoading && handleVote("downvote")}
        />
        <p>{formatNumber(localDownvotes)}</p>
      </div>
    </div>
  );
};

export default Votes;
