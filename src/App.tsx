import PayPalButton, { PayPalFormValues } from './PayPalButton'
import { Formik, FormikConfig } from 'formik'
import './App.css'
import { PayPalScriptOptions } from '@paypal/paypal-js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Button from './ButtonForStrict'

const submitHandler: FormikConfig<PayPalFormValues>['onSubmit'] = (_, formik) => {
  setTimeout(() => {
    formik.setValues({ _paypal_token: 'fake_paypal_token' })
    formik.setSubmitting(false)
  }, 3000)
}

const paypalScriptOptions: PayPalScriptOptions = {
  clientId: 'f21968588d247',
  currency: '',
}

function App() {
  return (
    <>
      <Formik<PayPalFormValues> onSubmit={submitHandler} initialValues={{}}>
        <PayPalButton />

        {/* this part is for strict solution please remove the comments and comment the PayPalButton above*/}
        {/* <PayPalScriptProvider options={paypalScriptOptions}>
          <Button />
        </PayPalScriptProvider> */}
      </Formik>
    </>
  )
}

export default App
