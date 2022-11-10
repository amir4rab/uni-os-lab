import classes from './learn-more.module.scss';

const learnMore = () => {
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
      </div>
    </div>
  );
};

export default learnMore;
