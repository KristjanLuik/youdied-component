

# React YouDied Overlay

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple React component for creating a Dark Souls-style "You Died" overlay. This component is fully customizable and can be used to create dramatic overlays for your web applications.

## Features

- Dark Souls-inspired "You Died" overlay.
- Fully customizable text, colors, animations, and styles.
- Supports custom fonts and additional class names.
- Built with React and TypeScript for type safety.
- Lightweight and easy to integrate.

## Installation

Install the package via npm or yarn:

```bash
npm install react-youdied-overlay
```

or

```bash
yarn add react-youdied-overlay
```

## Usage

Here's an example of how to use the `YouDiedOverlay` component:

```tsx
import React, { useState } from "react";
import { YouDiedOverlay } from "react-youdied-overlay";

const App = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div>
      <button onClick={() => setShowOverlay(true)}>Trigger Overlay</button>
      <YouDiedOverlay
        text="YOU DIED"
        show={showOverlay}
        color="#8B0000"
        glowColor="#FF3B30"
        fontFamily="Cinzel, serif"
        onAnimationComplete={() => setShowOverlay(false)}
      />
    </div>
  );
};

export default App;
```

## Props

The `YouDiedOverlay` component accepts the following props:

| Prop                | Type       | Default       | Description                                                                 |
|---------------------|------------|---------------|-----------------------------------------------------------------------------|
| `text`              | `string`   | `"YOU DIED"`  | The text to display in the overlay.                                        |
| `show`              | `boolean`  | `false`       | Whether the overlay is visible.                                            |
| `enterDuration`     | `number`   | `2000`        | Duration of the fade-in animation in milliseconds.                         |
| `exitDuration`      | `number`   | `900`         | Duration of the fade-out animation in milliseconds.                        |
| `color`             | `string`   | `"#8B0000"`   | The color of the text.                                                     |
| `glowColor`         | `string`   | `"#FF3B30"`   | The glow color of the text.                                                |
| `fontFamily`        | `string`   | `"serif"`     | The font family of the text.                                               |
| `className`         | `string`   | `undefined`   | Additional CSS class names for the overlay container.                      |
| `onAnimationComplete` | `() => void` | `undefined` | Callback function triggered when the exit animation completes.             |

## Storybook

You can explore the component in an interactive Storybook environment. To start Storybook locally, run:

```bash
npm run storybook
```

## Build

To build the library, run:

```bash
npm run build
```

The output will be available in the `dist` directory.