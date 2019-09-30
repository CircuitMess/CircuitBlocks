import React from 'react';

import { Card, CardContainer } from '../Card';
import Section from './Section';
import { Sketch } from '../../layouts/Home';

interface ProjectSectionProps {
  title: string;
  projects: Sketch[];
  onPress: (params: { type: 'NEW' | 'OPEN'; sketch?: Sketch }) => void;
  createNew?: boolean;
}

const ProjectSection: React.FC<ProjectSectionProps> = (props: ProjectSectionProps) => {
  const { title, projects, onPress, createNew } = props;

  return (
    <Section>
      <h2>{title}</h2>
      <CardContainer>
        {createNew && (
          <Card onClick={() => onPress({ type: 'NEW' })}>
            <h1>New project</h1>
          </Card>
        )}

        {projects.map((sketch: Sketch, index) => (
          <Card key={`section-${title}-${index}`}
            onClick={() => onPress({ type: 'OPEN', sketch })}>
              <div className="image"><svg dangerouslySetInnerHTML={{ __html: sketch.snapshot || "" }} /></div>
            <div className="cover">
              <div className="title">{sketch.title}</div>
              {sketch.description && <div className="description">{sketch.description}</div>}
            </div>
          </Card>
        ))}
      </CardContainer>
    </Section>
  );
};

export { ProjectSection };
