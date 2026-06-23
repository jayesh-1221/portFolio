import React from 'react';
import PropTypes from 'prop-types';

/**
 * Minimal re-implementation of vertical-timeline-component-for-react's
 * `Timeline`, which only supported React <= 16. The markup and class names are
 * kept identical so the original CSS (and look) carry over unchanged. The
 * `timeline--animate` class enables the per-item bounce-in reveal.
 */
function Timeline({
  children, className = '', lineColor = '#000', animate = true,
}) {
  const classes = `${className} timeline${animate ? ' timeline--animate' : ''}`.trim();
  return (
    <div className="timeline--wrapper">
      <div className={classes} style={{ color: lineColor }}>
        {children}
      </div>
    </div>
  );
}

Timeline.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  lineColor: PropTypes.string,
  animate: PropTypes.bool,
};

export default Timeline;
