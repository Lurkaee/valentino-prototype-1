import { sanitizeText } from "@/lib/sanitize";

export interface SsrRenderOptions {
  publicId?: string;
  theme?: "midnight-rose" | "cloud-nine" | "kage";
}

export function renderModulesHtml(
  modulesConfig?: Record<string, any>,
  moduleOrder?: string[],
  publicId: string = ""
): string {
  if (!modulesConfig || typeof modulesConfig !== "object") {
    return "";
  }

  const order =
    Array.isArray(moduleOrder) && moduleOrder.length > 0
      ? [...moduleOrder]
      : ["voiceNote", "videoMemory", "memories", "timeline", "quiz", "secret", "openWhen"];

  for (const modId of Object.keys(modulesConfig)) {
    if (modulesConfig[modId]?.enabled && !order.includes(modId)) {
      order.push(modId);
    }
  }

  const rendered: string[] = [];

  for (const modId of order) {
    const m = modulesConfig[modId];
    if (!m || !m.enabled) continue;

    // 1. Voice Note Module
    if (modId === "voiceNote" && m.url) {
      rendered.push(`
        <div class="module-voice-card" data-testid="module-voice-note" style="margin-top: 1.5rem; padding: 1.25rem; border-radius: 1rem; background: rgba(32, 6, 21, 0.85); border: 1px solid rgba(244, 63, 94, 0.25); text-align: center;">
          <div style="font-size: 0.65rem; color: #FDA4AF; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.35rem; font-weight: 600;">🎙️ Voice Note Audio Seal</div>
          <h3 style="font-family: Georgia, serif; font-size: 1.15rem; color: #FAF8F5; margin-bottom: 0.35rem;">${sanitizeText(m.title || "Voice Note")}</h3>
          <p data-testid="voice-caption" style="font-size: 0.8rem; color: #D5CEBF; font-style: italic; margin-bottom: 0.85rem;">${sanitizeText(m.caption || "A personal message from my heart to yours")}</p>
          <audio id="voice-audio-el" src="${sanitizeText(m.url)}" preload="metadata"></audio>
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; max-width: 20rem; margin: 0 auto;">
            <button type="button" id="voice-play-btn" data-testid="voice-play-btn" aria-label="Play voice note" style="width: 2.25rem; height: 2.25rem; border-radius: 9999px; background: #E11D48; color: white; border: none; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; cursor: pointer;">▶</button>
            <input type="range" id="voice-scrub-bar" data-testid="voice-scrub-bar" min="0" max="100" value="0" style="flex: 1; accent-color: #FB7185; cursor: pointer;" />
            <span id="voice-time-display" data-testid="voice-time-display" style="font-size: 0.75rem; color: #FDA4AF; font-variant-numeric: tabular-nums;">0:00</span>
          </div>
        </div>
      `);
    }

    // 2. Video Memory Capsule Module
    if (modId === "videoMemory" && m.url) {
      rendered.push(`
        <div class="module-video-card" data-testid="module-video-memory" style="margin-top: 1.5rem; padding: 1.25rem; border-radius: 1rem; background: rgba(32, 6, 21, 0.85); border: 1px solid rgba(244, 63, 94, 0.25);">
          <div style="font-size: 0.65rem; color: #FDA4AF; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.35rem; font-weight: 600;">🎞️ Video Memory Capsule</div>
          <h3 style="font-family: Georgia, serif; font-size: 1.15rem; color: #FAF8F5; margin-bottom: 0.5rem;">${sanitizeText(m.title || "Video Memory")}</h3>
          <div style="position: relative; width: 100%; aspect-ratio: 16/9; overflow: hidden; border-radius: 0.75rem; background: #000; border: 1px solid rgba(255,255,255,0.15);">
            <video id="video-memory-el" data-testid="video-memory-player" src="${sanitizeText(m.url)}" poster="${sanitizeText(m.posterUrl || "")}" controls playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: contain;"></video>
          </div>
          ${m.caption ? `<p data-testid="video-memory-caption" style="text-align: center; font-size: 0.8rem; color: #D5CEBF; font-style: italic; margin-top: 0.65rem;">${sanitizeText(m.caption)}</p>` : ""}
        </div>
      `);
    }

    // 3. Our Memories Photo Gallery Module
    if (modId === "memories" && m.items && m.items.length > 0) {
      rendered.push(`
        <div class="module-memories-card" data-testid="module-memories" style="margin-top: 1.5rem; padding: 1.25rem; border-radius: 1rem; background: rgba(32, 6, 21, 0.85); border: 1px solid rgba(244, 63, 94, 0.25);">
          <div style="font-size: 0.65rem; color: #FDA4AF; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.35rem; font-weight: 600;">📸 Our Memories</div>
          <h3 style="font-family: Georgia, serif; font-size: 1.15rem; color: #FAF8F5; margin-bottom: 0.85rem;">${sanitizeText(m.title || "Our Cherished Memories")}</h3>
          
          <div class="memories-stage" style="position: relative; max-width: 24rem; margin: 0 auto;">
            <div style="background: #FAF8F5; padding: 0.85rem; border-radius: 0.85rem; box-shadow: 0 16px 36px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.9); text-align: center;">
              <div id="memory-photo-container" style="width: 100%; aspect-ratio: 4/3; overflow: hidden; border-radius: 0.5rem; background: #222; cursor: zoom-in;" title="Click to enlarge">
                <img id="memory-active-photo" data-testid="memory-active-photo" src="${sanitizeText(m.items[0]?.url || "")}" alt="Memory photo" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;" />
              </div>
              <div style="padding-top: 0.65rem;">
                <div id="memory-item-date" data-testid="memory-item-date" style="font-size: 0.7rem; color: #BE123C; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${sanitizeText(m.items[0]?.date || "")}</div>
                <div id="memory-item-title" data-testid="memory-item-title" style="font-size: 0.95rem; font-weight: 600; color: #1C1917; margin-top: 0.15rem;">${sanitizeText(m.items[0]?.title || "")}</div>
                <div id="memory-item-caption" data-testid="memory-item-caption" style="font-family: Georgia, serif; font-style: italic; font-size: 0.85rem; color: #57534E; margin-top: 0.25rem;">${sanitizeText(m.items[0]?.caption || "")}</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.75rem;">
              <button type="button" id="memory-prev-btn" data-testid="memory-prev-btn" aria-label="Previous memory" style="padding: 0.4rem 0.85rem; border-radius: 9999px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #FAF8F5; font-size: 0.75rem; cursor: pointer;">← Prev</button>
              <span id="memory-counter" style="font-size: 0.75rem; color: #FDA4AF; font-family: monospace;">1 / ${m.items.length}</span>
              <button type="button" id="memory-next-btn" data-testid="memory-next-btn" aria-label="Next memory" style="padding: 0.4rem 0.85rem; border-radius: 9999px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #FAF8F5; font-size: 0.75rem; cursor: pointer;">Next →</button>
            </div>

            <div class="memory-thumbnails" style="display: flex; gap: 0.4rem; overflow-x: auto; padding: 0.5rem 0; margin-top: 0.5rem;">
              ${m.items.map((item: any, idx: number) => `
                <button type="button" class="memory-thumb-btn" data-testid="memory-thumbnail-${idx}" data-idx="${idx}" aria-label="View photo ${idx + 1}" style="flex-shrink: 0; width: 3rem; height: 2.25rem; border-radius: 0.35rem; overflow: hidden; border: 2px solid ${idx === 0 ? '#FB7185' : 'transparent'}; cursor: pointer; padding: 0; background: none;">
                  <img src="${sanitizeText(item.url)}" alt="Thumb ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover;" />
                </button>
              `).join("")}
            </div>

            <!-- Lightbox Modal -->
            <div id="memory-lightbox" class="hidden" style="position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.92); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem;">
              <button type="button" id="lightbox-close-btn" data-testid="lightbox-close" aria-label="Close photo view" style="position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(255,255,255,0.2); border: none; color: white; width: 2.5rem; height: 2.5rem; border-radius: 9999px; font-size: 1.25rem; cursor: pointer;">✕</button>
              <img id="lightbox-img" src="" alt="Enlarged memory" style="max-width: 90vw; max-height: 75vh; object-fit: contain; border-radius: 0.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.8);" />
              <div id="lightbox-caption" style="margin-top: 1rem; color: #FAF8F5; text-align: center; max-width: 30rem; font-family: Georgia, serif; font-style: italic; font-size: 0.95rem;"></div>
            </div>

            <script id="memories-data" type="application/json">
              ${JSON.stringify(m.items)}
            </script>
          </div>
        </div>
      `);
    }

    // 4. Timeline of Us Module
    if (modId === "timeline" && m.items && m.items.length > 0) {
      rendered.push(`
        <div class="module-timeline-card" data-testid="module-timeline" style="margin-top: 1.5rem; padding: 1.25rem; border-radius: 1rem; background: rgba(32, 6, 21, 0.85); border: 1px solid rgba(244, 63, 94, 0.25);">
          <div style="font-size: 0.65rem; color: #FDA4AF; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.35rem; font-weight: 600;">⏳ Timeline of Us</div>
          <h3 style="font-family: Georgia, serif; font-size: 1.15rem; color: #FAF8F5; margin-bottom: 0.85rem;">${sanitizeText(m.title || "Our Journey")}</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; border-left: 2px solid rgba(244, 63, 94, 0.3); padding-left: 0.85rem; margin-left: 0.35rem;">
            ${(m.items || []).map((item: any) => `
              <div class="timeline-item">
                <div style="font-size: 0.7rem; color: #FDA4AF; font-weight: 500;">${sanitizeText(item.date || "")}</div>
                <div style="font-size: 0.9rem; font-weight: 600; color: #FAF8F5;">${sanitizeText(item.title || "")}</div>
                <div style="font-size: 0.8rem; color: #D5CEBF; font-weight: 300;">${sanitizeText(item.description || "")}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `);
    }

    // 5. Love Quiz Module
    if (modId === "quiz" && m.questions && m.questions.length > 0) {
      rendered.push(`
        <div class="module-quiz-card" data-testid="module-quiz" style="margin-top: 1.5rem; padding: 1.25rem; border-radius: 1rem; background: rgba(32, 6, 21, 0.85); border: 1px solid rgba(244, 63, 94, 0.25);">
          <div style="font-size: 0.65rem; color: #FDA4AF; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.35rem; font-weight: 600;">💘 Love Quiz</div>
          <h3 style="font-family: Georgia, serif; font-size: 1.15rem; color: #FAF8F5; margin-bottom: 0.85rem;">${sanitizeText(m.title || "How Well Do You Know Us?")}</h3>
          <div id="quiz-container">
            <div id="quiz-question" style="font-size: 0.9rem; color: #FAF8F5; margin-bottom: 0.65rem;">
              ${sanitizeText(m.questions[0]?.question || "")}
            </div>
            <div class="quiz-options" style="display: flex; flex-direction: column; gap: 0.4rem;">
              ${(m.questions[0]?.options || []).map((opt: string, optIdx: number) => `
                <button type="button" data-testid="quiz-option-${optIdx}" class="quiz-opt-btn" style="padding: 0.55rem 0.85rem; border-radius: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #FAF8F5; text-align: left; cursor: pointer; font-size: 0.8rem; transition: background 0.2s;">
                  ${sanitizeText(opt)}
                </button>
              `).join("")}
            </div>
            <div id="quiz-feedback" data-testid="quiz-feedback-pill" class="hidden" style="margin-top: 0.65rem; padding: 0.45rem 0.65rem; border-radius: 0.5rem; font-size: 0.75rem; background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); color: #6EE7B7;">
              ✓ ${sanitizeText(m.questions[0]?.explanation || "Everything about you makes my heart smile.")}
            </div>
            <button type="button" id="quiz-next" data-testid="quiz-next-button" class="hidden" style="margin-top: 0.65rem; padding: 0.35rem 0.75rem; border-radius: 9999px; background: #E11D48; color: white; border: none; font-size: 0.7rem; font-weight: 500; cursor: pointer;">
              Complete Quiz
            </button>
          </div>
        </div>
      `);
    }

    // 6. Secret Note Module
    if (modId === "secret") {
      rendered.push(`
        <div class="module-secret-card" data-testid="module-secret" style="margin-top: 1.5rem; padding: 1.25rem; border-radius: 1rem; background: rgba(32, 6, 21, 0.85); border: 1px solid rgba(244, 63, 94, 0.25);">
          <div style="font-size: 0.65rem; color: #FDA4AF; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.35rem; font-weight: 600;">🔐 Secret Note</div>
          ${m.questionLock?.enabled ? `
            <div data-testid="secret-question-card" class="secret-question-card" style="text-align: center; padding: 0.5rem 0;">
              <div style="font-size: 1.75rem; margin-bottom: 0.25rem;">🗝️</div>
              <h4 style="font-family: Georgia, serif; font-size: 1rem; color: #FAF8F5; margin-bottom: 0.25rem;">Secret Question</h4>
              <p style="font-size: 0.85rem; color: #FDA4AF; font-style: italic; margin-bottom: 0.85rem;">${sanitizeText(m.questionLock.question)}</p>
              <form id="secret-verify-form" style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 18rem; margin: 0 auto;">
                <input type="text" id="secret-answer-input" data-testid="secret-question-input" placeholder="Type your answer..." required style="padding: 0.5rem 0.85rem; border-radius: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff; text-align: center; font-size: 0.8rem;" />
                <button type="submit" id="secret-verify-submit" data-testid="secret-question-submit" style="padding: 0.5rem 1rem; border-radius: 9999px; background: linear-gradient(135deg, #E11D48, #9F1239); color: white; border: 1px solid #FB7185; font-size: 0.75rem; font-weight: 500; cursor: pointer;">Unlock Secret</button>
              </form>
              <div id="secret-verify-error" data-testid="secret-verify-error" class="hidden" style="color: #FDA4AF; font-size: 0.75rem; margin-top: 0.5rem;"></div>
            </div>
          ` : `
            <p style="font-size: 0.9rem; color: #FAF8F5; margin-bottom: 0.85rem;">${sanitizeText(m.prompt || "A secret note just for you")}</p>
            <button type="button" id="reveal-secret-btn" data-testid="reveal-secret-button" style="padding: 0.5rem 1.15rem; border-radius: 9999px; background: linear-gradient(135deg, #E11D48, #9F1239); color: white; border: 1px solid #FB7185; font-size: 0.75rem; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem;">
              <span>✨</span> <span>Tap to Reveal Secret</span>
            </button>
          `}
          <div id="revealed-secret" data-testid="revealed-secret-content" class="hidden" style="margin-top: 0.75rem; padding: 0.85rem; border-radius: 0.75rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(244, 63, 94, 0.3); font-family: Georgia, serif; font-style: italic; color: #FDA4AF; font-size: 0.9rem; line-height: 1.5; text-align: center;"></div>
        </div>
      `);
    }

    // 7. Open When Letters Module
    if (modId === "openWhen" && m.letters && m.letters.length > 0) {
      rendered.push(`
        <div class="module-openwhen-card" data-testid="module-open-when" style="margin-top: 1.5rem; padding: 1.25rem; border-radius: 1rem; background: rgba(32, 6, 21, 0.85); border: 1px solid rgba(244, 63, 94, 0.25);">
          <div style="font-size: 0.65rem; color: #FDA4AF; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.35rem; font-weight: 600;">💌 Open When...</div>
          <h3 style="font-family: Georgia, serif; font-size: 1.15rem; color: #FAF8F5; margin-bottom: 0.85rem;">${sanitizeText(m.title || "Open When You Need Me")}</h3>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${(m.letters || []).map((letter: any) => `
              <div class="openwhen-item" style="padding: 0.65rem; border-radius: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);">
                <div style="font-size: 0.85rem; font-weight: 600; color: #FDA4AF;">${sanitizeText(letter.situation || "")}</div>
                <div style="font-size: 0.8rem; color: #D5CEBF; font-style: italic; margin-top: 0.25rem;">${sanitizeText(letter.message || "")}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `);
    }
  }

  return rendered.join("\n");
}

export function renderReactionsAndReplyHtml(publicId: string): string {
  return `
    <!-- P1: Recipient Reactions Bar -->
    <div class="recipient-interactions-section" style="margin-top: 2rem; width: 100%;">
      <div style="text-align: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.2em; color: #FDA4AF; opacity: 0.85; font-weight: 600;">Leave a Reaction</span>
      </div>
      <div data-testid="recipient-reactions-bar" style="display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
        <button type="button" class="reaction-trigger-btn" data-testid="reaction-btn-heart" data-reaction="heart" aria-label="Send Love reaction" style="display: flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.85rem; border-radius: 9999px; background: rgba(225, 29, 72, 0.2); border: 1px solid rgba(244, 63, 94, 0.4); color: #FDA4AF; font-size: 0.8rem; cursor: pointer; transition: transform 0.2s, background 0.2s;">
          <span>❤️</span> <span>Love</span>
        </button>
        <button type="button" class="reaction-trigger-btn" data-testid="reaction-btn-sparkles" data-reaction="sparkles" aria-label="Send Magic reaction" style="display: flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.85rem; border-radius: 9999px; background: rgba(234, 179, 8, 0.15); border: 1px solid rgba(234, 179, 8, 0.35); color: #FDE68A; font-size: 0.8rem; cursor: pointer; transition: transform 0.2s, background 0.2s;">
          <span>✨</span> <span>Magic</span>
        </button>
        <button type="button" class="reaction-trigger-btn" data-testid="reaction-btn-tears_of_joy" data-reaction="tears_of_joy" aria-label="Send Touched reaction" style="display: flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.85rem; border-radius: 9999px; background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.35); color: #BFDBFE; font-size: 0.8rem; cursor: pointer; transition: transform 0.2s, background 0.2s;">
          <span>🥹</span> <span>Touched</span>
        </button>
        <button type="button" class="reaction-trigger-btn" data-testid="reaction-btn-warm_smile" data-reaction="warm_smile" aria-label="Send Warmth reaction" style="display: flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.85rem; border-radius: 9999px; background: rgba(249, 115, 22, 0.15); border: 1px solid rgba(249, 115, 22, 0.35); color: #FED7AA; font-size: 0.8rem; cursor: pointer; transition: transform 0.2s, background 0.2s;">
          <span>🥰</span> <span>Warmth</span>
        </button>
        <button type="button" class="reaction-trigger-btn" data-testid="reaction-btn-rose" data-reaction="rose" aria-label="Send Rose reaction" style="display: flex; align-items: center; gap: 0.35rem; padding: 0.4rem 0.85rem; border-radius: 9999px; background: rgba(225, 29, 72, 0.2); border: 1px solid rgba(244, 63, 94, 0.4); color: #FDA4AF; font-size: 0.8rem; cursor: pointer; transition: transform 0.2s, background 0.2s;">
          <span>🌹</span> <span>Rose</span>
        </button>
      </div>
      <div id="reaction-toast" data-testid="reaction-sent-toast" class="hidden" style="text-align: center; margin-top: 0.5rem; font-size: 0.75rem; color: #FDA4AF; font-weight: 500;">
        Reaction sent with love! ❤️
      </div>
    </div>

    <!-- P1: Recipient Reply Card -->
    <div data-testid="recipient-reply-card" style="margin-top: 1.75rem; padding: 1.25rem; border-radius: 1rem; background: rgba(28, 5, 18, 0.9); border: 1px solid rgba(244, 63, 94, 0.3); text-align: center;">
      <div style="font-size: 0.65rem; color: #FDA4AF; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 0.35rem; font-weight: 600;">Private Reply</div>
      <h3 style="font-family: Georgia, serif; font-size: 1.1rem; color: #FAF8F5; margin-bottom: 0.5rem;">Send a Loving Note Back</h3>
      <p style="font-size: 0.75rem; color: #D5CEBF; margin-bottom: 0.85rem;">Only the creator of this experience will see your private reply.</p>
      
      <form id="recipient-reply-form" style="display: flex; flex-direction: column; gap: 0.65rem; max-width: 22rem; margin: 0 auto;">
        <input type="text" id="recipient-reply-name" data-testid="recipient-reply-name" placeholder="Your name or nickname (optional)" style="padding: 0.5rem 0.85rem; border-radius: 0.5rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.15); color: white; font-size: 0.8rem;" />
        <textarea id="recipient-reply-input" data-testid="recipient-reply-input" placeholder="Write your heartfelt reply..." required rows="3" style="padding: 0.65rem 0.85rem; border-radius: 0.5rem; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.15); color: white; font-size: 0.8rem; resize: vertical;"></textarea>
        <button type="submit" id="recipient-reply-submit" data-testid="recipient-reply-submit" style="padding: 0.5rem 1.25rem; border-radius: 9999px; background: linear-gradient(135deg, #E11D48, #9F1239); color: white; border: 1px solid #FB7185; font-size: 0.75rem; font-weight: 500; cursor: pointer;">Send Private Reply</button>
      </form>
      <div id="recipient-reply-success" data-testid="recipient-reply-success" class="hidden" style="margin-top: 0.75rem; padding: 0.65rem; border-radius: 0.5rem; background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); color: #6EE7B7; font-size: 0.8rem;">
        ✓ Your heartfelt reply has been delivered privately.
      </div>
      <div id="recipient-reply-error" data-testid="recipient-reply-error" class="hidden" style="margin-top: 0.5rem; color: #FDA4AF; font-size: 0.75rem;"></div>
    </div>
  `;
}

export function renderPrintKeepsakeButton(): string {
  return `
    <div style="margin-top: 1.25rem; text-align: center;">
      <button
        type="button"
        id="print-keepsake-btn"
        data-testid="print-keepsake-btn"
        aria-label="Save or print this keepsake"
        style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 1.15rem; border-radius: 9999px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #FDA4AF; background: rgba(76,5,25,0.5); border: 1px solid rgba(244,63,94,0.35); cursor: pointer; transition: all 0.2s;"
      >
        <span>🖨️</span>
        <span>Save as Keepsake / Print</span>
      </button>
    </div>
  `;
}

export const PRINT_MEDIA_STYLES = `
  @media print {
    body, html {
      background: #FFFFFF !important;
      color: #1C1917 !important;
      font-size: 12pt !important;
    }
    .ambient-glow, .blooms-container, .top-bar, #soundtrack-toggle,
    .seal-box, #reseal-btn, .recipient-interactions-section,
    [data-testid="recipient-reply-card"], #print-keepsake-btn,
    #read-aloud-btn, #voice-play-btn, #voice-scrub-bar, #memory-prev-btn,
    #memory-next-btn, .memory-thumbnails, #secret-verify-form, #reveal-secret-btn {
      display: none !important;
    }
    .wrapper {
      padding: 0 !important;
      min-height: auto !important;
    }
    .content-container, .card, .envelope-card {
      box-shadow: none !important;
      border: none !important;
      background: transparent !important;
      max-width: 100% !important;
      padding: 0 !important;
    }
    .letter-box {
      display: block !important;
    }
    .paper-card {
      border: 1px solid #D6D3D1 !important;
      box-shadow: none !important;
      background: #FAFAF9 !important;
      color: #1C1917 !important;
      padding: 2rem !important;
    }
    .message-card {
      color: #1C1917 !important;
      font-size: 13pt !important;
    }
    .module-memories-card, .module-voice-card, .module-video-card,
    .module-timeline-card, .module-quiz-card, .module-secret-card,
    .module-openwhen-card {
      background: transparent !important;
      border: 1px solid #E7E5E4 !important;
      color: #1C1917 !important;
      page-break-inside: avoid;
    }
  }
`;

export function getModulesClientScript(publicId: string): string {
  return `
    // Read-Aloud Speech Synthesis
    var readAloudBtn = document.getElementById('read-aloud-btn');
    var isReading = false;
    if (readAloudBtn && 'speechSynthesis' in window) {
      readAloudBtn.addEventListener('click', function() {
        if (isReading) {
          window.speechSynthesis.cancel();
          isReading = false;
          readAloudBtn.innerHTML = '<span>🔊</span> <span>Listen to Letter</span>';
          return;
        }
        var letterText = document.querySelector('[data-testid="letter-message"]');
        if (!letterText) return;
        var text = letterText.innerText || letterText.textContent;
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.onend = function() {
          isReading = false;
          readAloudBtn.innerHTML = '<span>🔊</span> <span>Listen to Letter</span>';
        };
        utterance.onerror = function() {
          isReading = false;
          readAloudBtn.innerHTML = '<span>🔊</span> <span>Listen to Letter</span>';
        };
        window.speechSynthesis.speak(utterance);
        isReading = true;
        readAloudBtn.innerHTML = '<span>⏹</span> <span>Stop Listening</span>';
      });
    }

    // Printable Keepsake
    var printKeepsakeBtn = document.getElementById('print-keepsake-btn');
    if (printKeepsakeBtn) {
      printKeepsakeBtn.addEventListener('click', function() {
        window.print();
      });
    }

    // Voice Note Player
    var voiceAudio = document.getElementById('voice-audio-el');
    var voicePlayBtn = document.getElementById('voice-play-btn');
    var voiceScrub = document.getElementById('voice-scrub-bar');
    var voiceTime = document.getElementById('voice-time-display');
    if (voiceAudio && voicePlayBtn) {
      voicePlayBtn.addEventListener('click', function() {
        if (voiceAudio.paused) {
          voiceAudio.play();
          voicePlayBtn.textContent = '⏸';
        } else {
          voiceAudio.pause();
          voicePlayBtn.textContent = '▶';
        }
      });
      voiceAudio.addEventListener('timeupdate', function() {
        if (voiceAudio.duration) {
          var pct = (voiceAudio.currentTime / voiceAudio.duration) * 100;
          if (voiceScrub) voiceScrub.value = pct;
          if (voiceTime) {
            var mins = Math.floor(voiceAudio.currentTime / 60);
            var secs = Math.floor(voiceAudio.currentTime % 60);
            voiceTime.textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;
          }
        }
      });
      voiceAudio.addEventListener('ended', function() {
        voicePlayBtn.textContent = '▶';
        if (voiceScrub) voiceScrub.value = 0;
      });
      if (voiceScrub) {
        voiceScrub.addEventListener('input', function() {
          if (voiceAudio.duration) {
            voiceAudio.currentTime = (voiceScrub.value / 100) * voiceAudio.duration;
          }
        });
      }
    }

    // Memories Slideshow & Lightbox
    var memDataEl = document.getElementById('memories-data');
    var memItems = [];
    if (memDataEl) {
      try { memItems = JSON.parse(memDataEl.textContent || '[]'); } catch(e){}
    }
    if (memItems.length > 0) {
      var currentIdx = 0;
      var activePhoto = document.getElementById('memory-active-photo');
      var itemDate = document.getElementById('memory-item-date');
      var itemTitle = document.getElementById('memory-item-title');
      var itemCaption = document.getElementById('memory-item-caption');
      var counter = document.getElementById('memory-counter');
      var prevBtn = document.getElementById('memory-prev-btn');
      var nextBtn = document.getElementById('memory-next-btn');
      var thumbs = document.querySelectorAll('.memory-thumb-btn');
      var lightbox = document.getElementById('memory-lightbox');
      var lightboxImg = document.getElementById('lightbox-img');
      var lightboxCaption = document.getElementById('lightbox-caption');
      var lightboxClose = document.getElementById('lightbox-close-btn');
      var photoContainer = document.getElementById('memory-photo-container');

      function updateMemory(idx) {
        if (idx < 0) idx = memItems.length - 1;
        if (idx >= memItems.length) idx = 0;
        currentIdx = idx;
        var item = memItems[currentIdx];
        if (activePhoto) activePhoto.src = item.url;
        if (itemDate) itemDate.textContent = item.date || '';
        if (itemTitle) itemTitle.textContent = item.title || '';
        if (itemCaption) itemCaption.textContent = item.caption || '';
        if (counter) counter.textContent = (currentIdx + 1) + ' / ' + memItems.length;

        thumbs.forEach(function(tb, i) {
          tb.style.borderColor = i === currentIdx ? '#FB7185' : 'transparent';
        });
      }

      if (prevBtn) prevBtn.addEventListener('click', function() { updateMemory(currentIdx - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function() { updateMemory(currentIdx + 1); });

      thumbs.forEach(function(tb) {
        tb.addEventListener('click', function() {
          var idx = parseInt(tb.getAttribute('data-idx') || '0', 10);
          updateMemory(idx);
        });
      });

      // Lightbox open
      if (photoContainer && lightbox) {
        photoContainer.addEventListener('click', function() {
          var item = memItems[currentIdx];
          if (lightboxImg) lightboxImg.src = item.url;
          if (lightboxCaption) lightboxCaption.textContent = (item.title ? item.title + ' — ' : '') + (item.caption || '');
          lightbox.classList.remove('hidden');
        });
      }
      if (lightboxClose && lightbox) {
        lightboxClose.addEventListener('click', function() {
          lightbox.classList.add('hidden');
        });
      }
      if (lightbox) {
        lightbox.addEventListener('click', function(e) {
          if (e.target === lightbox) lightbox.classList.add('hidden');
        });
      }

      // Keyboard navigation
      window.addEventListener('keydown', function(e) {
        if (lightbox && !lightbox.classList.contains('hidden')) {
          if (e.key === 'Escape') lightbox.classList.add('hidden');
        } else {
          if (e.key === 'ArrowLeft') updateMemory(currentIdx - 1);
          if (e.key === 'ArrowRight') updateMemory(currentIdx + 1);
        }
      });

      // Touch swipe
      var touchStartX = 0;
      if (photoContainer) {
        photoContainer.addEventListener('touchstart', function(e) {
          touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        photoContainer.addEventListener('touchend', function(e) {
          var diff = e.changedTouches[0].screenX - touchStartX;
          if (diff > 40) updateMemory(currentIdx - 1);
          else if (diff < -40) updateMemory(currentIdx + 1);
        }, { passive: true });
      }
    }

    // Secret Verification Form (Question Lock)
    var secretForm = document.getElementById('secret-verify-form');
    var secretInput = document.getElementById('secret-answer-input');
    var secretError = document.getElementById('secret-verify-error');
    var secretCard = document.querySelector('.secret-question-card');
    var revealedContent = document.getElementById('revealed-secret');
    if (secretForm && secretInput) {
      secretForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var answer = secretInput.value.trim();
        if (!answer) return;
        var submitBtn = document.getElementById('secret-verify-submit');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Verifying...'; }
        if (secretError) secretError.classList.add('hidden');

        fetch('/api/experiences/' + encodeURIComponent('${publicId}') + '/secret/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer: answer })
        })
        .then(function(res) {
          return res.json().then(function(data) {
            return { status: res.status, ok: res.ok, data: data };
          });
        })
        .then(function(result) {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Unlock Secret'; }
          if (result.ok && result.data.secretContent) {
            if (secretCard) secretCard.classList.add('hidden');
            if (revealedContent) {
              revealedContent.textContent = result.data.secretContent;
              revealedContent.classList.remove('hidden');
            }
          } else {
            if (secretError) {
              secretError.textContent = result.data.error || 'Incorrect answer. Try again!';
              secretError.classList.remove('hidden');
            }
          }
        })
        .catch(function(err) {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Unlock Secret'; }
          if (secretError) {
            secretError.textContent = 'Network error. Please try again.';
            secretError.classList.remove('hidden');
          }
        });
      });
    }

    // Recipient Reactions
    var reactionBtns = document.querySelectorAll('.reaction-trigger-btn');
    var reactionToast = document.getElementById('reaction-toast');
    if (reactionBtns.length > 0) {
      reactionBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var reactionType = btn.getAttribute('data-reaction');
          if (!reactionType) return;
          btn.style.transform = 'scale(1.2)';
          setTimeout(function() { btn.style.transform = 'scale(1)'; }, 200);

          fetch('/api/experiences/' + encodeURIComponent('${publicId}') + '/reactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reactionType: reactionType })
          })
          .then(function(res) { return res.json(); })
          .then(function(data) {
            if (reactionToast) {
              reactionToast.classList.remove('hidden');
              setTimeout(function() { reactionToast.classList.add('hidden'); }, 3000);
            }
          })
          .catch(function(){});
        });
      });
    }

    // Recipient Reply Form
    var replyForm = document.getElementById('recipient-reply-form');
    var replyInput = document.getElementById('recipient-reply-input');
    var replyName = document.getElementById('recipient-reply-name');
    var replySuccess = document.getElementById('recipient-reply-success');
    var replyError = document.getElementById('recipient-reply-error');
    var replySubmit = document.getElementById('recipient-reply-submit');
    if (replyForm && replyInput) {
      replyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var replyText = replyInput.value.trim();
        if (!replyText) return;
        var senderName = replyName ? replyName.value.trim() : '';
        if (replySubmit) { replySubmit.disabled = true; replySubmit.textContent = 'Sending...'; }
        if (replyError) replyError.classList.add('hidden');

        fetch('/api/experiences/' + encodeURIComponent('${publicId}') + '/replies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ replyText: replyText, senderName: senderName || undefined })
        })
        .then(function(res) {
          return res.json().then(function(data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function(result) {
          if (replySubmit) { replySubmit.disabled = false; replySubmit.textContent = 'Send Private Reply'; }
          if (result.ok) {
            replyForm.classList.add('hidden');
            if (replySuccess) replySuccess.classList.remove('hidden');
          } else {
            if (replyError) {
              replyError.textContent = result.data.error || 'Failed to send reply.';
              replyError.classList.remove('hidden');
            }
          }
        })
        .catch(function() {
          if (replySubmit) { replySubmit.disabled = false; replySubmit.textContent = 'Send Private Reply'; }
          if (replyError) {
            replyError.textContent = 'Network error. Please try again.';
            replyError.classList.remove('hidden');
          }
        });
      });
    }
  `;
}
