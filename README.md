# Exercise-8.5-p2-Asynchronous-JS

Springboard SE Bootcamp - Exercise 2 for Section 8.5 - Asynchronous JavaScript

Exercise Instructions: https://lessons.springboard.com/Asynchronous-JavaScript-Exercise-f981d0c95f57481db94e49305ea694a7

- if not, please see the "Assignment Instructions PDF" if offline.

## How to run the program

- run `cd js-async-exercise-p2`
- If you do not have `node` and `npm` installed, please go install them first.
- run `node space-mission-control.js` in the command line.

## Async Code Execution

Let's walk through how the code executes sequentially and asynchronously using setTimeout, setInterval, and the event loop (because it **is** confusing).

> Note: `console.log(...)` are synchronous so they execute immediately unless wrapped in an asynchronous function like `setTimeout(...)` or `setInterval(...)`.

1. Task 1 - variable declarations are **synchronous** → **runs instantly, no delays here**
2. Task 2 - `addOneTimeTask()` - adds a one-time task object to the oneTimeTasks array. It only stores the task, does not execute them. Thus, `addOneTimeTask()` is **synchronous** → **runs instantly, no delays here**
3. Task 3 - `runOneTimeTasks()` - the function iterates through all the tasks stored in oneTimeTasks and executes them with a delay. It is a combo of synchronous and asynchronous. The for loop is synchronous; however, the **`setTimeout(...)` is asynchronous**. → **asynchronous, so execution of each oneTimeTask is delayed.**
4. Task 4 - `startMonitoring()` - the function uses setInterval to continuously monitor space station parameters every 2 seconds. → **`setInterval(...)` is asynchronous, so it doesn’t block other code from running; however, execution is delayed due to interval. setInterval repeats the anonymous arrow function every 2000 milliseconds (2 seconds).**
5. Task 5 - `stopMonitoring()` - the function uses clearInterval to stop the continuous monitoring by clearing the interval set by startMonitoring. → **the `stopMonitoring()` is fully synchronous, but it's scheduled to run later via a `setTimeout(...)` from `runOneTimeTasks()`. (thus, delayed execution)**
6. Task 6 - `startCountdown()` - the function starts a 1-second repeating interval to countdown till takeoff. → **`setInterval(...)` makes it asynchronous. It is called after 15s (via setTimeout), then runs every second for 10 seconds.**
7. Task 7 - `scheduleMission()` - logs are synchronous; however, it calls functions which are asynchronous so those repeating tasks (e.g. setInterval), so we don't see the actual helper function "monitoring" occur until later, every 2 seconds. **`scheduleMission()` is a synchronous function call that triggers both sync and async actions**

## What does this mean for execution?

### Overview

JavaScript is **single-threaded**, meaning it runs code **top-to-bottom**, one line at a time. But asynchronous functions like `setTimeout` or `setInterval` allow you to schedule tasks for **later**, without blocking the rest of the code.

In this mission simulation, we use a mix of:

- **Synchronous** tasks: Run immediately.
- **Asynchronous** tasks: Scheduled to run later using timers (`setTimeout` (runs delayed code once), `setInterval` (repeats code using given duration)).

### Thinking of Synchronous vs Asynchronous

**Synchronous Code** runs immediately, step-by-step, top-to-bottom. JavaScript waits for it to finish before moving to the next line.

Example:

```
console.log("Step 1");
console.log("Step 2");
```

Output:

```
Step 1
Step 2
```

**Asynchronous Code** runs later, after a delay or when some event (like a network response or timer) finishes. JavaScript doesn't wait — it schedules it, then keeps going.

Example (with `setTimeout()`):

```
console.log("Before timeout");

setTimeout(() => {
  console.log("Inside timeout");
}, 1000);

console.log("After timeout");
```

Output (roughly after 1 second):

```
Before timeout
After timeout
Inside timeout
```

### Execution Timeline

Here’s what happens when the program runs:

#### (Immediately) at time = 0:

| What Happens                                               | Type                                                      | Explanation                                             |
| ---------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------- |
| Variable declarations (`oneTimeTasks`, `monitoringTaskId`) | **Synchronous**                                           | Runs instantly.                                         |
| `scheduleMission()` is called                              | **Synchronous**                                           | Triggers all mission setup.                             |
| Inside `scheduleMission()` → `startMonitoring()` is called | **Synchronous** (but calls `setInterval`, which is async) | Starts a repeating task every 2s.                       |
| `addOneTimeTask()` x3                                      | **Synchronous**                                           | Just stores tasks and delays; doesn’t run anything yet. |
| `runOneTimeTasks()` is called                              | **Synchronous**, but uses **`setTimeout` (Async)**        | Registers delayed tasks to run later.                   |

#### Scheduled Asynchronous Events

| Time                  | What Happens                            | Triggered By                                |
| --------------------- | --------------------------------------- | ------------------------------------------- |
| **2s, 4s, 6s, 8s...** | System monitoring logs print repeatedly | `setInterval` from `startMonitoring()`      |
| **5s**                | “Pre-launch system check complete.”     | First `setTimeout` task                     |
| **10s**               | `stopMonitoring()` called               | Second `setTimeout` task                    |
| **\~10s+**            | Monitoring output **stops**             | `clearInterval()` inside `stopMonitoring()` |
| **15s**               | `startCountdown(10)` called             | Third `setTimeout` task                     |
| **15s–25s**           | Countdown messages every second         | `setInterval` inside `startCountdown()`     |
| **25s**               | “Liftoff!”                              | When countdown ends                         |

#### Sequential vs Asynchronous Flow

JavaScript runs the following synchronously:

- Variable declarations
- Function definitions and calls (like `addOneTimeTask`, `scheduleMission`)
- Adding timers via `setTimeout` / `setInterval`

But the **timer-based behavior** itself is **asynchronous**:

- setTimeout schedules a task after a delay.
- setInterval repeats a task at fixed intervals.
- Both are non-blocking: they **don’t pause or delay the rest of your code**.

#### Function Type Breakdown

| Function              | Synchronous / Asynchronous                                        | Explanation                          |
| --------------------- | ----------------------------------------------------------------- | ------------------------------------ |
| Variable Declarations | **Synchronous**                                                   | Run immediately on page load.        |
| `addOneTimeTask`      | **Synchronous**                                                   | Only stores task config.             |
| `runOneTimeTasks`     | **Synchronous** to call `setTimeout` → which is **asynchronous**  | Immediately schedules delayed tasks. |
| `startMonitoring`     | **Synchronous** to call `setInterval` → which is **asynchronous** | Schedules a repeating check.         |
| `stopMonitoring`      | **Synchronous**                                                   | Stops the `setInterval`.             |
| `startCountdown`      | **Synchronous** to call `setInterval` → which is **asynchronous** | Starts the countdown logic.          |
| `scheduleMission`     | **Synchronous**                                                   | Orchestrates all scheduling.         |

#### Summary

`scheduleMission()` is the **launchpad** — it synchronously calls everything to **schedule** future work.

`setTimeout` (used in `runOneTimeTasks`) and `setInterval` (used in monitoring/countdown) are **asynchronous**. They do **not** block the rest of your code.

Everything runs **in order**, but **some tasks wait** before running thanks to their timers.
