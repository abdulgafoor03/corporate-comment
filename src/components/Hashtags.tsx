import { useFeedBackContext } from "../hooks/hooks";


export default function Hashtags() {
  const { hashtagList,setSelectedCompany}=useFeedBackContext();
  return (
    <ul className="hashtags">
      {hashtagList.map((hashtag:string,i) => {
        return (
          <li key={hashtag+i}>
            <button onClick={()=>{setSelectedCompany(hashtag)}}>{`#${hashtag}`}</button>
          </li>
        );
      })}
      
    </ul>
  );
}
