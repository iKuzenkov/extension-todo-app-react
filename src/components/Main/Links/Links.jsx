import "./Links.css";

import gitHubIcon from "../../images/github.png";
import websiteIcon from "../../images/website.png";
import donateIcon from "../../images/donate.png";
import gmailIcon from "../../images/gmail.png";
import autoclickIcon from "../../images/autoclick.png";

function Links() {
  return (
    <>
      <div className="todo-ext-info">
        <a
          href="https://github.com/iKuzenkov/todo-app-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={gitHubIcon} alt="GitHub" title="GitHub" />
        </a>

        <a
          href="https://browser-extensions-hub.vercel.app/to-do"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={websiteIcon} alt="Website" title="Website" />
        </a>

        <a
          href="https://browser-extensions-hub.vercel.app/donate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={donateIcon} alt="Donate" title="Donate" />
        </a>

        <a
          href="https://browser-extensions-hub.vercel.app/contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={gmailIcon} alt="Gmail" title="Gmail" />
        </a>

        <a
          href="https://chromewebstore.google.com/detail/mgadnfjigmdiljhffhjlopjfibddkneh?utm_source=item-share-cb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={autoclickIcon}
            alt="autoclick extansion"
            title="Autoclick Extansion"
          />
        </a>
      </div>
    </>
  );
}

export default Links;
