import React, { useEffect, useState, useContext } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import 'react-vertical-timeline-component/style.min.css';
import '../css/experience.css';

const styles = {
  ulStyle: {
    listStylePosition: 'outside',
    paddingLeft: 20,
  },
  subtitleContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
  },
  subtitleStyle: {
    display: 'inline-block',
  },
  inlineChild: {
    display: 'inline-block',
  },
};

function Experience(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />

      {data
        ? (
          <div className="section-content-container">
            <Container>
              <VerticalTimeline
                lineColor={theme.timelineLineColor}
                animate
              >
                {data.map((item) => (
                  <VerticalTimelineElement
                    key={item.title + item.dateText}
                    date={item.dateText}
                    dateClassName="timeline-date"
                    contentStyle={{
                      background: theme.cardBackground,
                      color: theme.color,
                      border: '1px solid ' + theme.cardBorderColor,
                    }}
                    contentArrowStyle={{ borderRight: '7px solid ' + theme.cardBackground }}
                    iconStyle={{ background: theme.accentColor }}
                  >
                    <h2 className="item-title">
                      {item.title}
                    </h2>
                    <div style={styles.subtitleContainerStyle}>
                      <h4 style={{ ...styles.subtitleStyle, color: theme.accentColor }}>
                        {item.subtitle}
                      </h4>
                      {item.workType && (
                        <h5 style={styles.inlineChild}>
                          &nbsp;·
                          {' '}
                          {item.workType}
                        </h5>
                      )}
                    </div>
                    <ul style={styles.ulStyle}>
                      {item.workDescription.map((point) => (
                        <div key={point}>
                          <li>
                            <ReactMarkdown
                              components={{
                                p: 'span',
                              }}
                            >
                              {point}
                            </ReactMarkdown>
                          </li>
                          <br />
                        </div>
                      ))}
                    </ul>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            </Container>
          </div>
        ) : <FallbackSpinner /> }
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
