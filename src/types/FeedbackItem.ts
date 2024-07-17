export type TFeedbackItem = {
  id: number;
  upvoteCount: number;
  badgeLetter: string;
  company: string;
  text: string;
  daysAgo: number;
};
export type TFeedbackItemArray=TFeedbackItem[];

export type ContainerProps={
  feedbackData:TFeedbackItemArray;
  isLoading:boolean;
  errorMessage:string;
  handleAddToList?:(text:string)=>void;
}
export type headerProps={
  handleAddToList:(text:string)=>void
}