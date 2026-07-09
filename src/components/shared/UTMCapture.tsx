'use client';

import { useUtmTracking } from '@/hooks/useUtmTracking';

export default function UTMCapture() {
  useUtmTracking();
  return null;
}
