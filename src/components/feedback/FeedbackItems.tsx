import { TriangleUpIcon } from "@radix-ui/react-icons";
import { TFeedbackItem } from "../../types/FeedbackItem";
import { useState } from "react";

type FeedbackItemProps = {
  feed: TFeedbackItem;
};
export default function FeedbackItems({feed}:FeedbackItemProps) {
  const {upvoteCount,badgeLetter,company,text,daysAgo}= feed;
  const [open, setOpen] =useState(false);
  const [upvoteCounter,setUpvoteCounter]=useState(upvoteCount);
  const handleCount=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    setUpvoteCounter(prev=>++prev);
    e.currentTarget.disabled=true;
    e.stopPropagation();
  }
  return (
     <li className={`feedback ${open?'feedback--expand':''}`} onClick={()=>setOpen(prev=>!prev)}>
        <button onClick={handleCount}>
          <TriangleUpIcon />
          <span>{upvoteCounter}</span>
        </button>
        <div>
          <p>{badgeLetter}</p>
        </div>
        <div>
          <p>{company}</p>
          <p>
            {text}
          </p>
        </div>
        <p>{daysAgo===0?'NEW':`${daysAgo}d`}</p>
      </li>
  )
}
