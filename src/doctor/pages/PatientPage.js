import React from 'react';

import { useParams } from 'react-router-dom';
import { Sick } from '@mui/icons-material';
import { Icon } from '@material-ui/core';
import NavTabs from '../../common-components/NavTabs';
import PatientInfo from './PatientInfo';

import HistoryDisplay from './HistoryDisplay';

const TabPanel = (prop) => {
  const { children, current, index } = prop;
  return (
    <div role="tabpanel" hidden={current !== index}>
      {current === index && children}
    </div>
  );
};

function PatientPage() {
  let { patientId, name, sessionId } = useParams();

  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  const tabs = [
    {
      index: 0,
      label: 'Biodata',
      link: `/patient/${patientId}/${name}/${sessionId}`
    },

    {
      index: 1,
      label: 'View History',
      link: `/history-overview/${patientId}`
    }
  ];

  return (
    <div className="">
      <div className="p-10">
        <section className="grid justify-items-stretch mb-6">
          <div className="justify-self-start">
            <div className="flex space-x-3 items-center">
              <Icon className="mt-[-5px]">
                <Sick />
              </Icon>
              <h1 className="">{name}</h1>
            </div>
          </div>
          <div className="justify-self-center">
            <NavTabs currentTab={currentTab} handleTabChange={handleTabChange} tabs={tabs} />
          </div>
        </section>
        <TabPanel current={currentTab} index={0}>
          <PatientInfo patientId={patientId} />
        </TabPanel>

        <TabPanel current={currentTab} index={1}>
          <HistoryDisplay />
        </TabPanel>
      </div>
    </div>
  );
}

export default PatientPage;
