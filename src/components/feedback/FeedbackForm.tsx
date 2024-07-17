import { useState } from "react";
import { MAX_CHARACTERS } from "../../constants/constants";
import { useFeedBackContext } from "../../hooks/FeedbackItemContextProvider";


export default function Feedbackform() {
  const { handleAddToList }= useFeedBackContext();


  const [text, setText] = useState("");
  const [textValidation,setTextValidation]=useState(false);
  const [textInValidation,setTextInValidation]=useState(false);
  const charCount=MAX_CHARACTERS-text.length;

  const handleChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const newText=e.target.value;
    if(newText.length>MAX_CHARACTERS){
      return ;
    }
    setText(newText);
  }
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    if( text.includes('#') && text.length>=5){
      setTextValidation(true);
      setTimeout(()=>setTextValidation(false),2000);
    }else{
      setTextInValidation(true);
      setTimeout(()=>setTextInValidation(false),2000);
      return;
    }
    handleAddToList(text);
    setText('');
  }
  return (
    <form onSubmit={handleSubmit} className={`form ${textValidation?'form--valid':''} ${textInValidation?'form--invalid':''}` }>
      <textarea
        id="feedback-textarea"
        value={text}
        placeholder="enter your comments here"
        spellCheck={false}
        onChange={handleChange}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
