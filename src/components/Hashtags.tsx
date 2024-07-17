type hastagProp={
  hashtagList:string[];
  setSelectedCompany:(tag:string)=>void;
}
export default function Hashtags({ hashtagList,setSelectedCompany }:hastagProp) {
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
