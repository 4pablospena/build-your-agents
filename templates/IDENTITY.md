# IDENTITY.md — Agent Metadata

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

## Multi-Agent Settings
can_spawn: false
parent_agent: none
visible_to: [owner]

## Session Settings
context_window: rolling-8k
session_timeout: 4h
auto_save_memory: true
