import { useEffect, useState } from 'react';
import '../styles/ReadMe.css';
import Markdown from 'react-markdown';

const ReadMe = () => {
    const [markdown, setMarkdown] = useState<string | null>(null);

    useEffect(() => {
    fetch('https://raw.githubusercontent.com/crazy-thing/mml-website/main/README.md')
      .then(res => res.text())
      .then(markdown => {
        setMarkdown(markdown);
      })
      .catch(console.error);
  }, []);

  return (
    <div className='readme'>
        <Markdown>{markdown}</Markdown>
    </div>
  )
}

export default ReadMe