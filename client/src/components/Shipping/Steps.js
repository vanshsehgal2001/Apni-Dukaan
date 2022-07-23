import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { GiConfirmed } from 'react-icons/gi'
import { GiPayMoney } from 'react-icons/gi'
import './Steps.css'

const Steps = ({ currentStep }) => {
    return (
        <>
            <Stepper alternativeLabel className="stepper-container" activeStep={currentStep} >
                <Step active={currentStep === 0 ? true : false} completed={currentStep > 0 ? true : false} >
                    <StepLabel style={{ color: currentStep === 0 ? "red" : currentStep > 0 && "green" }} icon={<MdOutlineLocalShipping style={{ fontSize: "30px" }} />} >
                        <b>Shipping Details</b>
                    </StepLabel>
                </Step>
                <Step active={currentStep === 1 ? true : false} completed={currentStep > 1 ? true : false}  >
                    <StepLabel style={{ color: currentStep === 1 ? "red" : currentStep > 1 && "green" }} icon={<GiConfirmed style={{ fontSize: "30px" }} />} >
                        <b>Order Confirmation</b>
                    </StepLabel>
                </Step>
                <Step active={currentStep === 2 ? true : false} completed={currentStep > 2 ? true : false}  >
                    <StepLabel style={{ color: currentStep === 2 ? "red" : currentStep > 2 && "green" }} icon={<GiPayMoney style={{ fontSize: "30px" }} />} >
                        <b>Confirm Payment</b>
                    </StepLabel>
                </Step>
            </Stepper>
        </>
    )
}

export default Steps