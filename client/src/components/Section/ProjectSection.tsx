import React from 'react';

import { Card, CardContainer } from '../Card';
import Section from './Section';
import { Sketch } from '../../layouts/Home';

interface ProjectSectionProps {
  title: string;
  projects: Sketch[];
  onPress: (params: { type: 'NEW' | 'OPEN'; filename?: string }) => void;
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

        {projects.map((project, index) => (
          <Card key={`section-${title}-${index}`}
            onClick={() => onPress({ type: 'OPEN', filename: project.path })}>
              <div className="image"><svg dangerouslySetInnerHTML={{ __html: project.snapshot || "" }} /></div>
            <div className="cover">
              <div className="title">{project.title}</div>
              {project.description && <div className="description">{project.description}</div>}
            </div>
          </Card>
        ))}
      </CardContainer>
    </Section>
  );
};

export { ProjectSection };
