import React from 'react';

import { Card, CardContainer } from '../Card';
import Section from './Section';
import {Devices, Sketch} from '../../layouts/Home';

interface ProjectSectionProps {
  title: string;
  projects: { block: Sketch[], code: Sketch[] };
  onPress: (type: 'NEW' | 'OPEN', sketch?: Sketch) => void;
  createNew?: boolean;
}

const ProjectSection: React.FC<ProjectSectionProps> = (props: ProjectSectionProps) => {
  const { title, projects, onPress, createNew } = props;

  return (
    <Section>
      <h2>{title}</h2>
      <CardContainer>
        {createNew && (
          <Card onClick={() => onPress('NEW' )} className={"new"}>
              <div>
                  <i className="material-icons"> add </i>
                  <h3>New project</h3>
              </div>
          </Card>
        )}

        {projects.block.map((sketch: Sketch, index) => (
          <Card key={`section-${title}-${index}`} className={ "descriptive" }
            onClick={() => onPress('OPEN', sketch)}>
              <div className="image"><svg dangerouslySetInnerHTML={{ __html: sketch.snapshot || "" }} /></div>
            <div className="cover">
              <div className="title">{sketch.title}</div>
              <div className="description">
                  <p className="device">{Devices[sketch.device].name}</p>
                  { sketch.description && <p>{sketch.description}</p> }
              </div>
            </div>
          </Card>
        ))}

          {projects.code.map((sketch: Sketch, index) => (
              <Card key={`section-${title}-${index}`} className={ "descriptive" }
                    onClick={() => onPress('OPEN', sketch)}>
                  <div className="image code"><i className="material-icons"> code </i></div>
                  <div className="cover">
                      <div className="title">{sketch.title}</div>
                      <div className="description">
                          <p className="device">{Devices[sketch.device].name}</p>
                          { sketch.description && <p>{sketch.description}</p> }
                      </div>
                  </div>
              </Card>
          ))}
      </CardContainer>
    </Section>
  );
};

export { ProjectSection };
