# Load‑Test  
*(Replace with the project’s real name)*

A simple toolset to run load/performance tests on web endpoints (HTTP, WebSocket, etc.).

---

## 🧭 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [Performance Metrics](#performance-metrics)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
This tool allows developers and QA engineers to simulate concurrent users and request volumes for performance tests. Ideal for validating scalability, reliability, and identifying bottlenecks.

---

## Features
- Configure concurrency (`-c`)
- Total request count (`-n`)
- Requests per second (`--rps`)
- Supports HTTP & WebSocket
- Detailed metrics: avg/median/percentile response times, throughput, error rates
- Built‑in reporting (console, JSON, CSV)

---

## Requirements
- Node.js ≥ 16 (or relevant runtime)
- npm or yarn
- Minimal memory/CPU baseline

---

## Installation

```bash
git clone https://github.com/joeAphiwat/Load‑Test.git
cd Load‑Test
npm install
