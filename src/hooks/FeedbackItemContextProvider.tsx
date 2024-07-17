import { TFeedbackItem, TFeedbackItemArray } from "../types/FeedbackItem";
import { useEffect, useMemo, useState, createContext, useContext } from "react";

type FeedbackItemsContextProps={
    filteredList:TFeedbackItemArray,
    errorMessage:string,
    isLoading:boolean,
    hashtagList:string[],
    selectedCompany:string,
    setSelectedCompany:(text:string)=>void,
    handleAddToList:(text:string)=>void
}
type FeedbackItemsContextChildrenProps={
    children:React.ReactNode
}
export const FeedbackContext = createContext<FeedbackItemsContextProps | null>(null);
export  function FeedbackItemContextProvider({children}:FeedbackItemsContextChildrenProps) {
  const [feedbackData, setFeedbackData] = useState<TFeedbackItemArray>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredList: TFeedbackItem[] = useMemo(
    () =>
      selectedCompany
        ? feedbackData.filter(
            (feed) =>
              feed.company.toLowerCase() === selectedCompany.toLowerCase()
          )
        : feedbackData,
    [feedbackData, selectedCompany]
  );

  const hashtagList:string[] = useMemo(
    () => [...new Set(feedbackData.map((feed) => feed.company.toUpperCase()))],
    [feedbackData]
  );
  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };
    setFeedbackData([...feedbackData, newItem]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };
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

  return <FeedbackContext.Provider value={{
    filteredList,
    errorMessage,
    isLoading,
    hashtagList,
    selectedCompany,
    setSelectedCompany,
    handleAddToList
  }}>{children}</FeedbackContext.Provider>
}

export function useFeedBackContext(){
    const context=useContext(FeedbackContext);
    if(!context){
      throw new Error('FeedbackitemContextProvider is not available')
    }
    return context
}