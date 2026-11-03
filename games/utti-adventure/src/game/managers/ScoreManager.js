import { MILESTONE_STEP, LEVELS } from '../config/constants.js';
export default class ScoreManager {
  constructor() { this.reset(); }
  reset() { this.score = 0; this.nextMilestone = MILESTONE_STEP; }
  get level() { return Math.min(LEVELS.length - 1, Math.floor(this.score / MILESTONE_STEP)); }
  // Frame-rate independent. mult = score multiplier (Dép thần tốc = x2). Returns milestone once, or null.
  tick(dt, mult = 1) { this.score += dt * (10 + this.level * 2) * mult; return this.milestoneReached(); }
  add(points) { this.score += points; }
  milestoneReached() { if (this.score >= this.nextMilestone) { const m = this.nextMilestone; this.nextMilestone += MILESTONE_STEP; return m; } return null; }
  get display() { return Math.floor(this.score); }
}
