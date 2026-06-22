import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Minimal re-implementation of vertical-timeline-component-for-react's
 * `TimelineItem` (the original only supported React <= 16). It renders the
 * same `.entry` / `.title` / `.timeline-item-date` / `.body` structure so the
 * original single-column, arrow-shaped-date styling is reproduced exactly, and
 * reveals each entry with the original bounce-in animation as it scrolls into
 * view (the original used react-visibility-sensor; here it's an
 * IntersectionObserver to avoid the deprecated dependency).
 */
function TimelineItem({
  children,
  dateText = '',
  dateStyle = null,
  dateInnerStyle = null,
  bodyContainerStyle = null,
  style = null,
  className = '',
  id = '',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const animClass = visible ? 'bounce-in' : 'is-hidden';

  return (
    <div id={id} ref={ref} className={`${className} entry`.trim()} style={style}>
      <div className="title">
        <div className={animClass}>
          <span style={dateStyle} className="timeline-item-date">
            <time
              style={dateInnerStyle}
              className="timeline-item-dateinner"
              title={dateText}
            >
              {dateText}
            </time>
          </span>
        </div>
      </div>
      <div className="body">
        <div className={`body-container ${animClass}`} style={bodyContainerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}

TimelineItem.propTypes = {
  children: PropTypes.node,
  dateText: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  dateStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  dateInnerStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  bodyContainerStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default TimelineItem;
