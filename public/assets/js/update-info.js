var updateOverview = function(data) {
  // Update Orders received
  document.getElementById('ov-order-received').innerHTML = data.overview.orderInformation.ordersReceived.toString();

  // Update Orders Activated
  document.getElementById('ov-order-activated').innerHTML = data.overview.orderInformation.ordersActivated.toString();

  // Update Orders Pending
  document.getElementById('ov-order-pending').innerHTML = data.overview.orderInformation.ordersPending.toString();

  // Update Orders with Error/Partially Processed
  document.getElementById('ov-order-error').innerHTML = data.overview.orderInformation.ordersWError.toString();

  // Update Subscriptions Cancelled
  document.getElementById('ov-sub-cancelled').innerHTML = data.overview.subscriptionInformation.cancelled.toString();

  // Update Subscriptions Opted out
  document.getElementById('ov-sub-optout').innerHTML = data.overview.subscriptionInformation.optedOut.toString();

  // Update Subscriptions Opted In
  document.getElementById('ov-sub-optin').innerHTML = data.overview.subscriptionInformation.optedIn.toString();

  // Update Invoice Billing Requests sent
  document.getElementById('ov-invoice-br-sent').innerHTML = data.overview.invoiceInformation.brSent.toString();

  // Update Invoice Billing Responses received
  document.getElementById('ov-invoice-br-received').innerHTML = data.overview.invoiceInformation.brReceived.toString();

  // Update Invoice Credit/Debit Memos sent
  document.getElementById('ov-invoice-cm-dm-sent').innerHTML = data.overview.invoiceInformation.cmDmSent.toString();

  // Update Invoice Billing Responses (CM/DM) received
  document.getElementById('ov-invoice-cm-dm-received').innerHTML = data.overview.invoiceInformation.cmDmReceived.toString();

  // Update Renewal Requests sent
  document.getElementById('ov-renew-sent').innerHTML = data.overview.renewalInformation.sent.toString();

  // Update Renewal responses received
  document.getElementById('ov-renew-received').innerHTML = data.overview.renewalInformation.received.toString();

  // Update Revenue Total Billed
  document.getElementById('ov-rev-total').innerHTML = data.overview.revenueInformation.totalBilled.toString();

  // Update Revenue Total Collected
  document.getElementById('ov-rev-collected').innerHTML = data.overview.revenueInformation.totalCollected.toString();

  // Update Revenue Payments Failed
  document.getElementById('ov-rev-failed').innerHTML = data.overview.revenueInformation.paymentsDeclined.toString();

  // Update Revenue Payments with Error
  document.getElementById('ov-rev-error').innerHTML = data.overview.revenueInformation.paymentsWithError.toString();

  // Update Revenue Payments with COM Failure
  document.getElementById('ov-rev-com').innerHTML = data.overview.revenueInformation.paymentsWithComFailure.toString();
}

var updateTc = function(data) {
  // Update Bill Plans sent to Trade Compliance
  document.getElementById('tc-total-sent').innerHTML = data.tc.billPlansSent.toString();
}

var updateAuth = function(data) {
  // Update Authorization Accounts Attempted
  document.getElementById('auth-attempts').innerHTML = data.auth.accountsAttempted.toString();
}

var updateOmega = function(data) {
  // Update Omega AR Bills sent for invoicing
  document.getElementById('oar-bills-sent').innerHTML = data.omegaAr.billsSent.toString();

  // Update Omega AR Responses returned from Omega AR with Invoice Number
  document.getElementById('oar-bills-returned').innerHTML = data.omegaAr.responsesReturned.toString();

  // Update Omega AR Accounts with capture Failure
  document.getElementById('oar-failure').innerHTML = data.omegaAr.accountsWFailure.toStrin();
}
