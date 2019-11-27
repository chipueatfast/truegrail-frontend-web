import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InfoInput from '../InfoInput';
import { useStyles, StepContainer } from './styled';

function getSteps() {
    return [
        'Generate',
        'Print',
    ];
}

function IssueStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
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
        />
      )
    }

    function renderPrintList() {
      return (
        <div>List to print</div>
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
