import React, { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useFormikContext } from 'formik'
import type PayPal from '@paypal/paypal-js'

const buttonStyle = {
  color: 'gold',
  fundingicons: false,
  label: 'checkout',
  shape: 'rect',
  size: 'responsive',
  tagline: false,
} as PayPal.PayPalButtonsComponentOptions['style']

type PayPalButtonComponent = React.ComponentType<
  PayPal.PayPalButtonsComponentOptions & { commit: boolean; env: string }
>

export type PayPalFormValues = { _paypal_token?: string }

const paypal = window['paypal']
const Button = (paypal?.Buttons! as any).driver('react', {
  React,
  ReactDOM,
}) as PayPalButtonComponent

function PayPalButton() {
  // useFormikContext is used to remove the HOC
  const { isValid, values, isSubmitting, submitForm, setSubmitting } = useFormikContext<PayPalFormValues>()

  // all the other functions created are passed to Button component and this one is passed to other callback,
  // so all of them are wrapped to useCallback to prevent unnecessary triggers
  const sleepUntilSubmitted = useCallback(async () => {
    const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    while (isSubmitting) {
      await sleep(100)
    }
  }, [])

  const createOrderOrBillingAgreement = useCallback(async () => {
    submitForm() // submit will call api with form values and inject _paypal_token into the form values
    await sleepUntilSubmitted()
    if (isValid) setSubmitting(true)
    return values._paypal_token!
  }, [submitForm, sleepUntilSubmitted, isValid, values])

  const onApprove = useCallback(async () => {
    // do something on success
  }, [])

  const onCancel = useCallback(() => {
    setSubmitting(false)
  }, [])

  const onError = useCallback(() => {
    setSubmitting(false)
  }, [])

  return (
    <div style={isSubmitting ? { display: 'none' } : {}}>
      <Button
        commit
        env="sandbox"
        createBillingAgreement={createOrderOrBillingAgreement}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}
        style={buttonStyle}
      />
    </div>
  )
}

export default PayPalButton
