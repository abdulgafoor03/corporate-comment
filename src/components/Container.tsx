import FeedbackList from "./feedback/FeedbackList";
import Header from "./Header";
import { ContainerProps } from "../types/FeedbackItem";


export default function Container({handleAddToList,feedbackData,isLoading,errorMessage}:ContainerProps) {
  return (
    <div className="container">
        <Header handleAddToList={handleAddToList}/>
        <FeedbackList feedbackData={feedbackData} isLoading={isLoading} errorMessage={errorMessage}/>
    </div>
  )
}
