import { useState } from 'preact/hooks';
import classes from './learn-more.module.scss';

const learnMore = () => {
  const [loadIframe, setLoadIframe] = useState(false);

  return (
    <div className={classes.learnMore}>
      <h3>Learn more</h3>
      <p>
        <span>
          {
            'Incase you want to learn more about Cpu Scheduling, you can read the following page on '
          }
        </span>
        <a
          href="https://en.wikipedia.org/wiki/Scheduling_(computing)"
          target="_blank"
          rel="noreferrer"
        >
          {'Wikipedia'}
        </a>
        <span>{'. Or you could watch the following video on youtube.'}</span>
      </p>
      <div className={classes.iframeWrapper}>
        {!loadIframe ? (
          <div
            className={classes.iframeLoader}
            style="max-height: 315px; max-width: 560px; aspect-ratio: 560 / 315;"
          >
            <p>keep in mind loading youtube will lead to data usage.</p>
            <button onClick={() => setLoadIframe(true)}>Load</button>
          </div>
        ) : (
          <iframe
            loading="lazy"
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/Jkmy2YLUbUY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default learnMore;
