import { useProfileContext, defaultProfile } from '@/components/providers/ProfileProvider';

export { defaultProfile };

export function useProfile() {
  return useProfileContext();
}
