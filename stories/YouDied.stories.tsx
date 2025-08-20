import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YouDiedOverlay from '../YouDied';

export const YouDied = {
  args: {
    text: 'YOU DIED',
    isVisible: true,
  },
};

export const VictoryAchieved = {
  args: {
    text: 'VICTORY ACHIEVED',
    isVisible: true,
    displayDuration: 3000,
  },
};

export const PrepareToDie = {
  args: {
    text: 'PREPARE TO DIE',
    isVisible: false,
  },
};

const meta = {
  title: 'YouDiedOverlay',
  component: YouDiedOverlay,
} satisfies Meta<typeof YouDiedOverlay>;

export default meta;

export const TimedDemo = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <h2 className="text-gray-400">Timed Demo: Overlay will appear in 1 second.</h2>
      <YouDiedOverlay text="ENEMY SLAIN" isVisible={showText} displayDuration={1500} />
    </div>
  );
};
