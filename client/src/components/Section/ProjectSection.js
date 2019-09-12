import React from 'react';

import { Card, CardContainer } from '../Card';
import Section from './Section';

const ProjectSection = (props) => {
  const { title, projects } = props;

  return (
    <Section>
      <h2>{title}</h2>
      <CardContainer>
        {projects.map((project) => (
          <Card>
            <div className="image"></div>
            <div className="cover">
              <div className="title">{project.title}</div>
              <div className="author">{project.author}</div>
              <div className="description">{project.description}</div>
            </div>
          </Card>
        ))}
      </CardContainer>
    </Section>
  );
};

export { ProjectSection };
