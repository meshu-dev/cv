const SkillGroup = (url: string, title: string, imgUrl: string) => {
    return (
      <a href={ url } target="_blank" title={ title }>
        <img src={ imgUrl } />
      </a>
    );
  };
  
  export default SkillGroup;
    