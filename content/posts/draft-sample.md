---
title: "Draft sample (dev only)"
description: "This post should not appear in production builds when draft is respected."
date: "2026-05-01"
tags: ["draft"]
draft: true
---

You should only see this body **in development**. In production and in `nuxt generate`, posts with `draft: true` are filtered out.

If you still see this in prod, check the `useBlogPostListQuery` filter and the detail route guard.
