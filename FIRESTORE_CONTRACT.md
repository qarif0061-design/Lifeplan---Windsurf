# Shared Firestore contract

This repository and the Lifeplans mobile app use Firebase project `lifeplans-f63f3`.
The two copies of `firestore.rules` and `firestore.indexes.json` must remain identical.

## Canonical shared documents

- `goals/{goalId}` — owned by `userId`.
- `daily_tasks/{userId}_{YYYY-MM-DD}` — a user's daily planner.
- `checkins/{userId}_{YYYY-MM-DD}` — a user's daily habits. New documents include both
  `date` and `dateKey`, and store each habit as `{ done: boolean, notes?: string }`.
- `plans/{planId}` — weekly or goal-linked plans. Consumers must tolerate optional
  feature-specific fields such as `goalId`, `status`, or `days`.
- `customPlanners`, `templates`, `achievements`, `challenges`, `accountabilities`,
  `referrals`, and `shares` — owned by `userId` unless their rules state otherwise.

## Compatibility

Legacy website check-ins may contain boolean habit values. Legacy mobile check-ins
may remain at `users/{userId}/dailyCheckins`; mobile reads those only as a fallback.
All new writes go to `checkins/{userId}_{YYYY-MM-DD}`. Do not create new data paths
without updating both apps and this contract.
