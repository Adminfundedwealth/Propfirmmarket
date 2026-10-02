export type ReviewVerificationStatus =
  | 'verified'
  | 'unverified'
  | 'verification-pending'
  | 'source-unavailable';

export type ReviewModerationStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'not-available';

export interface PublicReview {
  id: string;
  firmId: number;
  displayName?: string;
  title?: string;
  body?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  verificationStatus: ReviewVerificationStatus;
  verificationMethod?: string;
  provenance?: string;
  moderationStatus?: ReviewModerationStatus;
  source: 'public-source' | 'demo-static' | 'not-available' | 'future-service';
  firmResponse?: string;
  helpfulCount?: number;
  reportCount?: number;
}

export const publicReviewService = {
  async list(): Promise<PublicReview[]> {
    return [];
  },
  async listByFirmId(firmId: number): Promise<PublicReview[]> {
    return [];
  },
  async getById(id: string): Promise<PublicReview | undefined> {
    return undefined;
  },
};

export function getVerificationLabel(status: ReviewVerificationStatus) {
  const map: Record<ReviewVerificationStatus, string> = {
    verified: 'Verified',
    unverified: 'Unverified',
    'verification-pending': 'Verification pending',
    'source-unavailable': 'Source unavailable',
  };
  return map[status];
}

export function getPublicReviewSummary(firmId: number) {
  return {
    firmId,
    count: 0,
    verificationStatus: 'source-unavailable' as ReviewVerificationStatus,
    hasRatings: false,
    averageRating: undefined as number | undefined,
  };
}
