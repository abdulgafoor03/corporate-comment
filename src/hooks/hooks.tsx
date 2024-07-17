import { useEffect,useState,useContext } from "react";
import { TFeedbackItemArray } from "../types/FeedbackItem";
import { FeedbackContext } from "./FeedbackItemContextProvider";

export function useFeedBackContext(){
  const context=useContext(FeedbackContext);
  if(!context){
    throw new Error('FeedbackitemContextProvider is not available')
  }
  return context
}



export function useFeedbackData() {
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

  return {
    feedbackData,
    setFeedbackData,
    errorMessage,
    isLoading,
  }
}
