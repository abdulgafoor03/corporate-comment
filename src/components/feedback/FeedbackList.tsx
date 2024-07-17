import FeedbackItems from "./FeedbackItems";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedBackContext } from "../../hooks/FeedbackItemContextProvider";


export default function FeedbackList() {
  const {filteredList,isLoading,errorMessage}=useFeedBackContext();
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage}/>}
      {filteredList.map((feed, i) => {
        return <FeedbackItems key={feed.id + i} feed={feed} />;
      })}
    </ol>
  );
}
