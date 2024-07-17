import Feedbackform from "./feedback/FeedbackForm.js";
import Logo from "./Logo";
import BackgroundImage from "./BackgroundImage.js";
import PageHeading from "./PageHeading.js";


export default function Header() {
  
   
  return (
    <header>
      <BackgroundImage />
      <Logo />
      <PageHeading />
      <Feedbackform />
    </header>
  );
}
