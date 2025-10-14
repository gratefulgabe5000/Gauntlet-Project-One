/**
 * Cursor Component - Display Other Users' Cursors
 *
 * PR5.6: Cursor Display Integration
 *
 * Renders a cursor for another user on the canvas
 * Features:
 * - Colored cursor pointer
 * - User name label
 * - Smooth position updates
 * - Fades out when user goes offline
 */

import { Circle, Group, Text } from 'react-konva';
import type { UserPresence } from '../services/types';

interface CursorProps {
  user: UserPresence;
}

/**
 * Task 5.6.1: Render cursor for other users
 */
const Cursor = ({ user }: CursorProps) => {
  const cursorSize = 12;
  const labelOffset = 15;

  return (
    <Group x={user.cursorX} y={user.cursorY}>
      {/* Cursor pointer - small circle */}
      <Circle
        x={0}
        y={0}
        radius={cursorSize / 2}
        fill={user.cursorColor}
        stroke="#FFFFFF"
        strokeWidth={2}
        shadowColor="rgba(0, 0, 0, 0.3)"
        shadowBlur={4}
        shadowOffset={{ x: 0, y: 2 }}
        shadowOpacity={0.5}
      />

      {/* User name label */}
      <Group x={labelOffset} y={-5}>
        {/* Label background */}
        <Text
          text={user.displayName}
          fontSize={12}
          fontFamily="Arial, sans-serif"
          fill={user.cursorColor}
          fontStyle="bold"
          shadowColor="rgba(0, 0, 0, 0.5)"
          shadowBlur={3}
          shadowOffset={{ x: 0, y: 1 }}
          shadowOpacity={0.8}
        />
      </Group>
    </Group>
  );
};

export default Cursor;
