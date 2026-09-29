/**
 * AI Writing Assistant Groundwork (Phase 5D - P2 Architecture)
 * 
 * BOUNDARY & ARCHITECTURAL CONTRACT:
 * - AI remains strictly a co-pilot and never silently authors or alters creator text.
 * - All generation occurs through an explicit creator-initiated prompt flow.
 * - The creator MUST review, edit, and explicitly accept/save any suggestion.
 * - No arbitrary client component may execute unsupervised LLM calls.
 * - P2 remains non-user-facing until fully backed by secure server-side infrastructure.
 */

export type AiPromptTone = "tender" | "playful" | "poetic" | "nostalgic" | "intimate";

export interface AiWritingPromptRequest {
  targetField: "message" | "greeting" | "signOff" | "reasons" | "promises" | "milestone";
  currentContent?: string;
  tone: AiPromptTone;
  keywords?: string[];
  partnerName?: string;
  relationshipContext?: string;
}

export interface AiWritingSuggestion {
  id: string;
  suggestedText: string;
  explanation?: string;
  confidence: number;
  reviewedByCreator: boolean;
  acceptedAt?: string;
}

export interface AiWritingAssistantService {
  generateDraftSuggestion(
    request: AiWritingPromptRequest,
    creatorSessionToken: string
  ): Promise<AiWritingSuggestion>;
}
