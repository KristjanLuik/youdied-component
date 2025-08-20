import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YouDiedOverlay from '../src/YouDied';

const meta = {
  title: 'YouDiedOverlay',
  component: YouDiedOverlay,
  parameters: {
    layout: 'fullscreen',
    controls: {
      hideNoControlsWarning: true,
    },
  },
} satisfies Meta<typeof YouDiedOverlay>;

export default meta;

export const EatPie: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 grid place-items-center p-8">
      <button
        onClick={() => setShow(true)}
        className="pointer-events-auto px-5 py-3 rounded-2xl bg-neutral-100 text-neutral-900 font-medium shadow hover:shadow-lg transition text-red-300"
      >
        Trigger Overlay
      </button>

      <YouDiedOverlay text="EAT PIE" show={show} fontFamily="Cinzel, serif" />
    </div>
  );
};

export const YouDied: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 grid place-items-center p-8">
      <button
        onClick={() => setShow(true)}
        className="pointer-events-auto px-5 py-3 rounded-2xl bg-neutral-100 text-neutral-900 font-medium shadow hover:shadow-lg transition text-red-300"
      >
        Trigger Overlay
      </button>

      <YouDiedOverlay text="YOU DIED" show={show} fontFamily="Cinzel, serif" />
    </div>
  );
};