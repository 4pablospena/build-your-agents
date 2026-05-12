# IDENTITY.md — Agent Metadata

Routing and model hints for **your** stack. Fields are a **local
convention**: your runtime may ignore unused keys or map them to real
config. Only **Agent Metadata** (name, owner, dates) is universally useful
for humans reading the folder.

## Agent Metadata
name: [AgentName]
version: 1.0.0
owner: [Your Name]
created: [YYYY-MM-DD]

## Routing Configuration
gateway_port: 18789
fallback_mode: queue

## Model Configuration
primary: claude-opus-4-7
fallback: claude-haiku-4-5
temperature: 0.3
max_tokens: 8192

## Agent Tags
productivity, coding, [add tags for filtering or dashboards]

## Multi-Agent Settings
can_spawn: false
parent_agent: none
visible_to: [owner]

## Session Settings
context_window: rolling-8k
session_timeout: 4h
auto_save_memory: true
