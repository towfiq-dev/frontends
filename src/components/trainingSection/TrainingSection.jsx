import React from 'react';
import CertificatesSection from '../certificates/CertificatesSection';

// Thin wrapper so the /training route can render the shared certificates UI
// under a name that matches its own page context
const TrainingSection = ({ courses = [] }) => {
  return <CertificatesSection courses={courses} />;
};

export default TrainingSection;