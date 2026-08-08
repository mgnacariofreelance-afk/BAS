# BAS V1 — Customer Care Plan Subscriptions

## Purpose
BAS is sold to SMB customers with a monthly recurring Care Plan. A subscription is a customer service contract and is not a payment method.

## Subscription fields
- Subscription ID (auto)
- Client
- Plan Name
- Monthly Fee
- Start Date
- Billing Interval: Monthly
- Status: Active / Past Due / Paused / Cancelled
- Last Billed Date
- Last Paid Date
- Next Due Date
- Notes

## Recurrence rule
The customer is not required to choose a fixed day of the month when the subscription is created.

The system uses the prior billing/payment event as the recurrence anchor. Example:
- Customer pays on August 9.
- Next monthly cycle is based on one month after that event.
- Historical invoice and payment dates are never rewritten.
- Month-end dates must be handled safely (for example, a cycle anchored on the last valid day of a shorter month remains valid).

## Accounting rule
Creating a subscription does not create cash.

When a recurring cycle is generated:
- Create a service invoice/receivable.
- Debit Accounts Receivable.
- Credit Service Income.

When the customer actually pays:
- Cash payment: Accounts Receivable -> Undeposited Funds -> Cash on Hand or Bank through a Bank Deposit.
- Check/PDC: Accounts Receivable -> Undeposited Funds/clearing workflow according to payment status.
- Bank transfer: Accounts Receivable -> selected Bank account.

A recurring invoice must not be marked PAID until an actual payment transaction is recorded.

## UI requirements
### Dashboard
Show:
- Active Subscriptions
- Monthly Recurring Care Plan Revenue
- Due This Period
- Past Due

### Create menu
Add:
- Subscription / Care Plan

### Customer
Show active Care Plan(s), monthly fee, status and next due date.

### Financial Calendar
Show upcoming recurring subscription billings and overdue subscriptions.

### Reports
Add a Subscriptions / Care Plans report with client, plan, fee, status, last billed, last paid and next due date.

## Branding
Use the supplied Blessed Companions logo and visual identity: black/dark surfaces, metallic/silver typography, electric/deep blue accents and cyan highlights.
