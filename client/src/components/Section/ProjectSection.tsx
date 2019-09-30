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
          <Card onClick={() => onPress({ type: 'NEW' })} className={"new"}>
              <div>
                  <i className="material-icons"> add </i>
                  <h3>New project</h3>
              </div>
          </Card>
        )}

        {projects.map((sketch: Sketch, index) => (
          <Card key={`section-${title}-${index}`} className={ sketch.description ? "descriptive" : undefined }
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
