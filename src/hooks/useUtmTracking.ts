'use client';

import { useEffect } from 'react';
import { captureAndStoreUTMs, getStoredUTMs } from '@/lib/utils';
import { UTMParams } from '@/types';

export function useUtmTracking(): UTMParams {
  useEffect(() => {
    captureAndStoreUTMs();
  }, []);

  return getStoredUTMs();
}
