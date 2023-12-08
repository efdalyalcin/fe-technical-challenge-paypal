import { PayPalButtons } from '@paypal/react-paypal-js'
import type { PayPalButtonsComponentProps } from '@paypal/react-paypal-js'
import { useFormikContext } from 'formik'
import { PayPalFormValues } from './PayPalButton'

export default function Button() {
  const { isValid, values, isSubmitting, submitForm, setSubmitting } = useFormikContext<PayPalFormValues>()

  const sleepUntilSubmitted = async () => {
    const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    while (isSubmitting) {
      await sleep(100)
    }
  }

  // commented styles are not accepted anymore
  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: {
      layout: 'vertical',
      color: 'gold',
      // fundingicons: false,
      label: 'checkout',
      shape: 'rect',
      // size: 'responsive',
      tagline: false,
    },

    async createBillingAgreement() {
      submitForm() // submit will call api with form values and inject _paypal_token into the form values
      await sleepUntilSubmitted()
      if (isValid) setSubmitting(true)
      return values._paypal_token!
    },

    onApprove() {
      // do something on success
      return Promise.resolve()
    },

    onError() {
      setSubmitting(false)
    },

    onCancel() {
      setSubmitting(false)
    },
  }

  return (
    <div style={{ minWidth: 300, maxWidth: 500 }}>
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </div>
  )
}
