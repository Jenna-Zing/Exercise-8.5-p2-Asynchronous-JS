// Task 1: Declare The Task Array and The Interval ID
// declaring an array to hold your one-time tasks (`oneTimeTasks`) and variables for any interval IDs you'll need for continuous tasks (`monitoringTaskId`).
let oneTimeTasks = [];
let monitoringTaskId;

// Task 2: Add One-Time Task Function
function addOneTimeTask(func, delay) {
  // This function should add an object containing both parameters into the `oneTimeTasks` array.  It does not execute the function, it only stores it.
  oneTimeTasks.push({ function: func, delay: delay });
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
  // This function iterates through all of the tasks stored in the `oneTimeTasks` array, and executes them with a delay (using `setTimeout`).
  for (const oneTimeTask of oneTimeTasks) {
    // Since setTimeout is asynchronous, each task is scheduled to run after a certain delay but doesn’t block the rest of the code
    setTimeout(oneTimeTask.function, oneTimeTask.delay);
  }
}

// Task 4: Start Monitoring Function
// This function should print a message every few seconds and store the interval ID in `monitoringTaskId`.
function startMonitoring() {
  console.log(
    "Starting continuous monitoring of space station parameters...\n"
  );

  // uses `setInterval` to simulate continuous monitoring.
  monitoringTaskId = setInterval(() => {
    console.log("Monitoring space station conditions...");

    /* Some random space station condition checks */
    // **Oxygen Level Check**
    const oxygenLevel = Math.random() * 100; // Oxygen percentage (0 to 100)
    const oxygenStatus =
      oxygenLevel > 15 ? "Oxygen level stable" : "Warning: Low oxygen!";

    // **Fuel Level Check**
    const fuelLevel = Math.random() * 100; // Fuel percentage (0 to 100)
    const fuelStatus =
      fuelLevel > 30 ? "Fuel sufficient" : "Warning: Low fuel!";

    // **Power Status Check**
    const powerStatus = Math.random() > 0.1 ? "Power stable" : "Power failure!"; // 10% chance of failure

    // **Communication Check**
    const communicationCheck =
      Math.random() > 0.05
        ? "Communication: All systems go"
        : "Communication error!"; // 5% chance of error

    // **Station Temperature Check**
    const stationTemperature = Math.random() * 50; // Temperature range 0°C to 50°C
    const temperatureStatus =
      stationTemperature < 15
        ? "Cold"
        : stationTemperature > 25
        ? "Hot"
        : "Temperature stable";

    // Print all the condition check results
    console.log(
      `Oxygen Level: ${oxygenLevel.toFixed(2)}% | ${oxygenStatus}\n` +
        `Fuel Level: ${fuelLevel.toFixed(2)}% | ${fuelStatus}\n` +
        `Power Status: ${powerStatus}\n` +
        `Communication Status: ${communicationCheck}\n` +
        `Station Temperature: ${stationTemperature.toFixed(
          2
        )}°C | ${temperatureStatus}\n`
    );
  }, 2000); // Adjust this interval as needed - set to 2 seconds for now
}

// Task 5: Stop Monitoring Function
function stopMonitoring() {
  // This function stops the continuous monitoring using clearInterval() by clearing the interval set by startMonitoring.
  clearInterval(monitoringTaskId);
  console.log("Monitoring of space station conditions stopped...\n");
}

// Task 6: Start Countdown Function
function startCountdown(duration) {
  let remainingTime = duration;
  console.log(`Countdown started: ${remainingTime} seconds\n`);

  // NOTE: asynchronous operation due to the use of setInterval. This countdown doesn’t block the rest of the code from executing.
  const countdownId = setInterval(() => {
    if (remainingTime > 0) {
      // decrease the countdown every second and print the remaining time.
      console.log(`T-minus ${remainingTime} seconds remaining...`);
      remainingTime--;
    } else {
      // When the countdown reaches 0, use clearInterval to stop the timer and print "Liftoff!".
      clearInterval(countdownId); // Stop the countdown when it reaches zero
      console.log("Liftoff!");
    }
  }, 1000); // Use `setInterval` to repeatly run this anonymous arrow function every second (decrease countdown and print remaining time until zero).
}

// Task 7: Schedule Pre-Launch Activities and Launch
function scheduleMission() {
  // This function is where the pre-launch tasks are scheduled (e.g. pre-launch system check, start and stop monitoring, and executing the countdown)
  // Make sure to adjust the delays appropriately to simulate a real mission timeline.
  startMonitoring(); // Starts monitoring space station conditions.
  addOneTimeTask(() => {
    console.log("Pre-launch system check complete.\n");
  }, 5000);
  addOneTimeTask(stopMonitoring, 10000); // Stops monitoring before the countdown.
  addOneTimeTask(() => {
    startCountdown(10);
  }, 15000); // Starts countdown after all preparations.

  runOneTimeTasks(); // Executes all scheduled one-time tasks.
}

scheduleMission(); // Starts the mission.
