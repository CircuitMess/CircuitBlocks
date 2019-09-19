import React from 'react';

import { Card, CardContainer } from '../Card';
import Section from './Section';

const ProjectSection = (props) => {
  const { title, projects, onPress, createNew } = props;

  console.log(projects);

  return (
    <Section>
      <h2>{title}</h2>
      <CardContainer>
        {createNew && (
          <Card onClick={() => onPress({ type: 'NEW' })}>
            <h1>New project</h1>
          </Card>
        )}
        {projects.map((project, index) => (
          <Card
            key={`section-${title}-${index}`}
            onClick={() => onPress({ type: 'OPEN', filename: project.filename })}
          >
            <div className="image"></div>
            <div className="cover">
              <div className="title">{project.title}</div>
              <div className="author">{project.author}</div>
              {project.description && <div className="description">{project.description}</div>}
            </div>
          </Card>
        ))}
      </CardContainer>
    </Section>
  );
};

export { ProjectSection };
