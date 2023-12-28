import { Step, Stepper } from "react-form-stepper";

// CustomStepper.js
const CustomStepper = ({ step }) => {

    return <Stepper
        styleConfig={{ activeBgColor: "#00B517", completedBgColor: "#00B517" }}
        connectorStyleConfig={{ size: 2, disabledColor: "#00B517" }}
        activeStep={step}>
        <Step />
        <Step />
        <Step />
    </Stepper>;
};

export default CustomStepper;