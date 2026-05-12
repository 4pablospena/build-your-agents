# HEARTBEAT.md — Scheduled Tasks

What the agent should do **on a schedule** without being pinged each time.
In practice, something outside the model must trigger runs (cron, CI, n8n,
“run heartbeat” shortcut, or a host product’s scheduled agent). This file
is the **checklist** those triggers should execute — it does not install a
scheduler by itself.

**Autonomy limit:** never run destructive, financial, or
send-on-behalf-of-user actions without explicit confirmation — notify
instead.

## Heartbeat Settings
frequency: daily at 09:00 [timezone]
enabled: true
notification_channel: chat

## Daily Tasks
- [ ] Check open issues across active repos
- [ ] Summarize overnight alerts or errors
- [ ] Review USER.md flagged priorities
- [ ] Generate memory/[today].md stub

## Weekly Tasks (Monday)
- [ ] Weekly project status summary
- [ ] Review and archive stale MEMORY.md entries
- [ ] Generate week-ahead checklist

## Conditional Tasks
- If deploy failed overnight → alert immediately
- If no commit in 3 days on active project → nudge user

## Heartbeat Log
- [YYYY-MM-DD]: [what ran, what was noted]

## Disabled Tasks
- [task]: [reason it was disabled]
