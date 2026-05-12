# HEARTBEAT.md — Scheduled Tasks

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

## Disabled Tasks
- [task]: [reason it was disabled]

## Heartbeat Log
- [YYYY-MM-DD]: [what ran, what was noted]
