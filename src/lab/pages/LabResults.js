import { useParams } from 'react-router';
import Results from '../components/Results';

function LabResults() {
  const { testId, testTitle, testDesc } = useParams();
  return (
    <div>
      <Results role="Lab" testId={testId} title={testTitle} description={testDesc} />
    </div>
  );
}

export default LabResults;
