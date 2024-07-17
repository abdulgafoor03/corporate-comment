import "./App.css";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Hashtags from "./components/Hashtags";
import {FeedbackItemContextProvider} from "./hooks/FeedbackItemContextProvider";

function App() {
  
  return (
    <div className="app">
      <Footer />
      <FeedbackItemContextProvider>
        <Container/>
        <Hashtags/>
      </FeedbackItemContextProvider>
    </div>
  );
}

export default App;
