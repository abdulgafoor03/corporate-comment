import FeedbackItems from "./FeedbackItems";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { ContainerProps } from "../../types/FeedbackItem";

export default function FeedbackList({feedbackData,isLoading,errorMessage}:ContainerProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage}/>}
      {feedbackData.map((feed, i) => {
        return <FeedbackItems key={feed.id + i} feed={feed} />;
      })}
    </ol>
  );
}
