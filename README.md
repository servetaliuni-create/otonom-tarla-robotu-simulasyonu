# Autonomous Farm Robot Simulation 

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Remotion](https://img.shields.io/badge/Remotion-000000?style=for-the-badge&logo=remotion&logoColor=white)](https://www.remotion.dev/)


---

## 🇬🇧 English

### About the Project
This project is a programmatic video simulation built with **React, TypeScript, and Remotion**. It demonstrates the UI/UX concepts and autonomous routing logic of an agricultural robot. Instead of using traditional video editing software (like After Effects or Premiere Pro), the entire 2-minute presentation was generated purely through code, utilizing data-driven state management and mathematical interpolation.

### Key Features & Technical Details
* **Programmatic Animation:** The simulation consists of 3600 frames (2 minutes at 30 FPS). All animations, including the intro sequences and HUD (Heads-Up Display) elements, are calculated dynamically based on the current frame.
* **Data-Driven Routing:** The robot's movement coordinates (`x`, `y`), battery levels, and action logs are fed from a central `data.json` file. The system reads this timeline and automatically orchestrates the simulation.
* **Kinematic Interpolation:** Movement between points is not discrete; it utilizes linear interpolation to ensure smooth, realistic transitions simulating physical robotic movement.
* **Dynamic UI (HUD):** The information boxes (HUD) employ quadrant logic (Dynamic Position Anchor) to calculate the robot's position on the screen and open towards the center, preventing overflow. Built entirely with **Tailwind CSS**.

### How to Run Locally
```bash
# Install dependencies
npm install

# Start the Remotion Studio
npm run dev

# Render the project to MP4
npx remotion render TarlaRobotu-Sunum output.mp4
