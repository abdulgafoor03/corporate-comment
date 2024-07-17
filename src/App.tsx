import "./App.css";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Hashtags from "./components/Hashtags";
import { TFeedbackItem, TFeedbackItemArray } from "../src/types/FeedbackItem";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [feedbackData, setFeedbackData] = useState<TFeedbackItemArray>([]);
  
  const [selectedCompany, setSelectedCompany] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const hashtagList = useMemo(()=>[...new Set(feedbackData.map((feed) => feed.company.toUpperCase()))],[feedbackData]);


  const filteredList:TFeedbackItem[] = useMemo(() => 
    selectedCompany ? feedbackData.filter((feed) => feed.company.toLowerCase() === selectedCompany.toLowerCase()):feedbackData
 , [feedbackData, selectedCompany]);

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

  return (
    <div className="app">
      <Footer />
      <Container
        feedbackData={filteredList}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
      <Hashtags
        hashtagList={hashtagList}
        setSelectedCompany={setSelectedCompany}
      />
    </div>
  );
}

export default App;
