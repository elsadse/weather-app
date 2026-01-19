import type { Position } from '@/type';
import { getUserPosition } from '@/utils';
import { createContext } from 'react';

export const UserPositionContext = createContext<Position>(await getUserPosition());