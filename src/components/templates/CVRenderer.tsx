import React from 'react';
import { CVData } from '../../types';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { CorporateTemplate } from './CorporateTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { StudentTemplate } from './StudentTemplate';

interface CVRendererProps {
  cv: CVData;
}

export const CVRenderer: React.FC<CVRendererProps> = ({ cv }) => {
  switch (cv.templateId) {
    case 'minimal':
      return <MinimalTemplate cv={cv} />;
    case 'corporate':
      return <CorporateTemplate cv={cv} />;
    case 'creative':
      return <CreativeTemplate cv={cv} />;
    case 'executive':
      return <ExecutiveTemplate cv={cv} />;
    case 'student':
      return <StudentTemplate cv={cv} />;
    case 'modern':
    default:
      return <ModernTemplate cv={cv} />;
  }
};
