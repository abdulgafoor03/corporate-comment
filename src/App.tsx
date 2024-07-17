import "./App.css";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Hashtags from "./components/Hashtags";
import { TFeedbackItem } from "../src/types/FeedbackItem";
import { useMemo, useState } from "react";
import { useFeedbackData } from "./hooks/hooks";

function App() {
  const { errorMessage, isLoading, feedbackData, setFeedbackData } =
    useFeedbackData();
  const [selectedCompany, setSelectedCompany] = useState("");

  const hashtagList = useMemo(
    () => [...new Set(feedbackData.map((feed) => feed.company.toUpperCase()))],
    [feedbackData]
  );

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
