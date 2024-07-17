import Feedbackform from "./feedback/FeedbackForm.js";
import Logo from "./Logo";
import BackgroundImage from './BackgroundImage.js';
import PageHeading from "./PageHeading.js";
import { headerProps } from "../types/FeedbackItem.js";

export default function Header({handleAddToList}:headerProps) {
  return (
    <header>
      <BackgroundImage />
      <Logo />
      <PageHeading/>
      <Feedbackform handleAddToList={handleAddToList}/>
    </header>
  );
}
