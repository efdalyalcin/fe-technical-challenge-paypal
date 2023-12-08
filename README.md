# Frontend Engineer: Technical Challenge PayPal Button

## Task

Take a look at the component `PayPalButton`, located in `/src/PayPalButton.tsx`.

1. What issues with it can you spot?

   - In render part:

     1. For styles using a ternary operator would be more readable.
     2. There is an extra wrapper `div` on render return.
     3. `onCancel` and `onError` has the same function created in the render, which is against don't repeat yourself (DRY) principle.
     4. In `Button` type `any` is used, which is not recommended in any case (however I couldn't fix it)
     5. `paypal=window['paypal']` logic is not needed in the component, it can be checked outside so it will not computed in every rerender (Although this is still not a good way to handle paypal)

   - Uses class based components

   - reaching `window` directly is not a good practice, it limits Reacts optimization.

   - If I were writing the component, I would create an `env` variable; however, since it is only used in one place, if there is not a company policy against it, it is not a mistake. I wouldn't give a review for this if I were the reviewee.

2. Re-factor the class component into a functional component, while applying improvements regarding the problems you noted before and any other optimizations.
3. Bonus: Get rid of the HOC connect component (perhaps by utilising other available APIs).
4. Bonus: There is an issue with running the current implementation in `React.StrictMode` - the PayPal button will be duplicated, how would you go about solving this problem?

   _Answer_:

   - I first looked at what was causing the duplicate, although from start I was almost sure reaching `window` object directly was the reason.
   - I first commented the `Button` in the render and put a regular form instead and there were no duplication so I tried to find a better way to handle that `Button` component coming from `paypal.Buttons`.
   - After some research I figured out there is a `react-paypal-js` library under `@paypal`. It is optimized for react so I decided to implement an minimal `Button`. I installed the dependencies. (Adding new packages was always a team decision in my experience, but this is a solo challenge so I took the liberty.)
   - Minimal button was rendering only once, so I was sure about the solution then implemented the logic according to new types and components.
   - I created a component named `ButtonForStrict.tsx`, also fixed the app component according to this component and left it in comment lines. You can test it by uncommenting but it doesn't work together with PayPalButton.tsx component so please comment while testing.

   - PS: the popup appears for a short time so sometimes it feels like there is nothing happening.

### Additional notes

- The component uses [PayPal SDK](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/). Keep in mind that due to the mock returning a fake value, `onAccept` will never be executed in this demo and the expected result is the SDK failing with `500` while trying to call `https://www.sandbox.paypal.com/smart/api/payment/fake_paypal_token/ectoken`
- The component also utilises [formik](https://formik.org/) as form/state management library.

## Submit your solution

You can provide your solution either

- as a zipped file containing the code or
- as a link to a fork of this repository.
