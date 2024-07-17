import { useEffect, useState } from "react";
import { TFeedbackItemArray } from "../types/FeedbackItem";

export function useFeedbackData(){
  const [feedbackData, setFeedbackData] = useState<TFeedbackItemArray>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
  setIsLoading(true);
  fetch(
    "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((res) => {
      setFeedbackData(res.feedbacks);
      setErrorMessage("");
      setIsLoading(false);
    })
    .catch(() => {
      setErrorMessage("Something went wrong..");
      setFeedbackData([]);
      setIsLoading(false);
    });
}, []);
return{
  errorMessage,
  isLoading,
  feedbackData,
  setFeedbackData
}
}