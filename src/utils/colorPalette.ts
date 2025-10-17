/**
 * Shape Color Palette Utilities
 *
 * PR8a.2.2: Color palette for shape fill colors (Phase 2a)
 *
 * Features:
 * - 20 preset colors for shape fills
 * - Recent colors tracking (last 6 used)
 * - localStorage persistence for recent colors
 * - Organized by color families for easy selection
 */

// ============================================================================
// Shape Color Palette (20 colors - 5 rows × 4 columns)
// ============================================================================

/**
 * 20 curated colors for shape fills
 * Organized by color families: Grays, Blues, Greens, Yellows, Reds
 */
export const SHAPE_COLOR_PALETTE = [
  // Row 1: Grays & Blacks
  { hex: '#000000', name: 'Black' },
  { hex: '#4B5563', name: 'Gray' },
  { hex: '#9CA3AF', name: 'Light Gray' },
  { hex: '#FFFFFF', name: 'White' },

  // Row 2: Blues
  { hex: '#1E3A8A', name: 'Navy Blue' },
  { hex: '#3B82F6', name: 'Blue' },
  { hex: '#60A5FA', name: 'Light Blue' },
  { hex: '#DBEAFE', name: 'Sky' },

  // Row 3: Greens
  { hex: '#065F46', name: 'Dark Green' },
  { hex: '#10B981', name: 'Green' },
  { hex: '#34D399', name: 'Light Green' },
  { hex: '#D1FAE5', name: 'Mint' },

  // Row 4: Yellows & Oranges
  { hex: '#D97706', name: 'Orange' },
  { hex: '#F59E0B', name: 'Amber' },
  { hex: '#FBBF24', name: 'Yellow' },
  { hex: '#FEF3C7', name: 'Cream' },

  // Row 5: Reds & Purples
  { hex: '#DC2626', name: 'Red' },
  { hex: '#EC4899', name: 'Pink' },
  { hex: '#8B5CF6', name: 'Purple' },
  { hex: '#F3E8FF', name: 'Lavender' },
] as const;

/**
 * Default colors for each shape type
 */
export const DEFAULT_SHAPE_COLORS = {
  rectangle: '#CCCCCC',
  circle: '#CCCCCC',
  text: '#000000',
  line: '#333333',
  arrow: '#000000',
} as const;

// ============================================================================
// Recent Colors Management (localStorage)
// ============================================================================

const RECENT_COLORS_KEY = 'collabcanvas_recent_colors';
const MAX_RECENT_COLORS = 6;

/**
 * Get recent colors from localStorage
 *
 * @returns Array of recently used color hex codes (max 6)
 */
export function getRecentColors(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_COLORS_KEY);
    if (!stored) return [];

    const colors = JSON.parse(stored);
    return Array.isArray(colors) ? colors.slice(0, MAX_RECENT_COLORS) : [];
  } catch (error) {
    console.error('Failed to load recent colors:', error);
    return [];
  }
}

/**
 * Add a color to recent colors list
 *
 * - Moves color to front if already exists
 * - Limits list to MAX_RECENT_COLORS (6)
 * - Persists to localStorage
 *
 * @param color - Hex color code to add
 */
export function addRecentColor(color: string): void {
  try {
    let recentColors = getRecentColors();

    // Remove if already exists
    recentColors = recentColors.filter(c => c.toLowerCase() !== color.toLowerCase());

    // Add to front
    recentColors.unshift(color.toUpperCase());

    // Limit to max
    recentColors = recentColors.slice(0, MAX_RECENT_COLORS);

    // Save to localStorage
    localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(recentColors));
  } catch (error) {
    console.error('Failed to save recent color:', error);
  }
}

/**
 * Clear all recent colors from localStorage
 */
export function clearRecentColors(): void {
  try {
    localStorage.removeItem(RECENT_COLORS_KEY);
  } catch (error) {
    console.error('Failed to clear recent colors:', error);
  }
}

/**
 * Check if a color exists in the preset palette
 *
 * @param color - Hex color code to check
 * @returns True if color is in preset palette
 */
export function isPresetColor(color: string): boolean {
  return SHAPE_COLOR_PALETTE.some(
    c => c.hex.toLowerCase() === color.toLowerCase()
  );
}

/**
 * Get color name from hex code
 *
 * @param color - Hex color code
 * @returns Color name or hex code if not found
 */
export function getColorName(color: string): string {
  const found = SHAPE_COLOR_PALETTE.find(
    c => c.hex.toLowerCase() === color.toLowerCase()
  );
  return found ? found.name : color;
}

/**
 * Validate hex color format
 *
 * @param color - Color string to validate
 * @returns True if valid hex color (#RGB or #RRGGBB)
 */
export function isValidHexColor(color: string): boolean {
  return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color);
}

/**
 * Normalize hex color to 6-digit format
 *
 * @param color - Hex color (#RGB or #RRGGBB)
 * @returns 6-digit hex color (#RRGGBB) or original if invalid
 */
export function normalizeHexColor(color: string): string {
  if (!isValidHexColor(color)) return color;

  // Already 6 digits
  if (color.length === 7) return color.toUpperCase();

  // Expand 3 digits to 6 (#RGB → #RRGGBB)
  if (color.length === 4) {
    const r = color[1];
    const g = color[2];
    const b = color[3];
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  return color;
}
