import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import GrailStamp from '../GrailStamp';
import InfoInput from '../InfoInput';
import { useStyles, StepContainer } from './styled';
import GeneratedStamps from '../GeneratedStamps/index';

function getSteps() {
    return [
        'Fill info',
        'Publish',
    ];
}

function IssueStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [batchInfo, setBatchInfo] = React.useState({});
    const steps = getSteps();

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    function getStepContent(stepIndex) {
      const stepContents = {
          0: renderGenerateForm,
          1: renderPrintList,
      }
      return stepContents[stepIndex];
  }

    function renderGenerateForm() {
      return (
        <InfoInput
          handleNext={handleNext}
          setBatchInfo={setBatchInfo}
        />
      )
    }

    function renderPrintList() {
      console.log(batchInfo);
      return (
        <GeneratedStamps
          batchInfo={batchInfo}
        />
      );
    }


    return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <StepContainer>
        {getStepContent(activeStep)()}
      </StepContainer>
    </div>
    );
}

export default IssueStepper;
