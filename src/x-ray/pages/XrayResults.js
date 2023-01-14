import { useParams } from 'react-router';
import Results from '../components/Results';

function XrayResults() {
  const { testId, testTitle, testDesc } = useParams();
  return (
    <div>
      <Results role="Xray" testId={testId} title={testTitle} description={testDesc} />
    </div>
  );
}

export default XrayResults;
