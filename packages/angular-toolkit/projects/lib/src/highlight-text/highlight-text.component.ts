import { ChangeDetectionStrategy, Component, computed, input } from "@angular/core";
import { Tag } from "primeng/tag";
import { isAbsentOrEmpty } from "@brightsparklabs/utils";

// -------------------------------------------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------------------------------------------

/** The delimiter to use for highlighting the text. */
const DELIMITER = "`";

// -------------------------------------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------------------------------------

/** Models a segment of the of the text broken by the delimiter. */
interface TextSegment {
  /** The value to display in the section. */
  value: string;

  /** If the value should be highlighted. */
  highlight?: boolean;
}

// -------------------------------------------------------------------------------------------------
// COMPONENT
// -------------------------------------------------------------------------------------------------

/**
 * Highlights the provided the text based on the delimiter "`" wrapping the highlighted content in
 * a {@link Tag} component.
 *
 * @example Basic usage:
 *```html
 * // Input:
 * <app-highlight-text text="alpha-`beta`-gamma" />
 *
 * // Output:
 * alpha-<p-tag value="beta" />-gamma
 * ```
 *
 * @example Missing closing delimiter:
 * ```html
 * // Input:
 * <app-highlight-text text="alpha-`beta-gamma" />
 *
 * // Output:
 * alpha-`beta-gamma
 * ```
 *
 * @example Complex case:
 * ```html
 * // Input:
 * <app-highlight-text text="`alp`ha`-``beta```-gamma" />
 *
 * // Output:
 * alp<p-tag value="ha" /><p-tag value="-" /><p-tag value="beta" /><p-tag value="" />-gamma
 *```
 */
@Component({
  selector: "bsl-app-highlight-text",
  imports: [Tag],
  template: `
    @for (segment of textSegments(); track $index) {
      @if (segment.highlight) {
        <p-tag severity="secondary" [value]="segment.value" />
      } @else {
        {{ segment.value }}
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightTextComponent {
  // -----------------------------------------------------------------------------------------------
  // COMPONENT INPUTS
  // -----------------------------------------------------------------------------------------------

  /** The text to highlight. */
  readonly text = input.required<string | undefined>();

  // -----------------------------------------------------------------------------------------------
  // INSTANCE VARIABLES
  // -----------------------------------------------------------------------------------------------

  /**
   * Handles breaking up the {@link text} into the various (un)highlighted text segments based on
   * the delimiter.
   *
   * @example Basic usage:
   *```
   * // Input:
   * text = "alpha-`beta`-gamma"
   *
   * // Output:
   * textSegments = [
   *    { value: "alpha-" },
   *    { value: "beta", highlight: true },
   *    { value: "-gamma" }
   * ]
   * ```
   *
   * @example Missing closing delimiter:
   * ```
   * // Input:
   * text = "alpha-`beta-gamma"
   *
   * // Output:
   * textSegments = [{ value: "alpha-" }, { value: "`beta-gamma" }]
   * ```
   *
   * @example Complex case:
   * ```
   * // Input:
   * text = "`alp`ha`-``beta```-gamma"
   *
   * // Output:
   * textSegments = [
   *    { value: "alp", highlight: true },
   *    { value: "ha" },
   *    { value: "-", highlight: true },
   *    { value: "beta", highlight: true },
   *    { value: "", highlight: true },
   *    { value: "-gama" }
   * ]
   *```
   */
  readonly textSegments = computed<Array<TextSegment>>(() => {
    const textValue = this.text();
    if (isAbsentOrEmpty(textValue)) {
      // There's nothing to highlight to return early.
      return [];
    }

    const segments: Array<TextSegment> = [];

    // NOTE: Algorithm is flexible such that we can modify our delimiter to be of any length.
    // e.g. we could use "```" instead of "`".
    let currentIndex = 0;
    while (currentIndex < textValue.length) {
      const startDelimiterIndex = textValue.indexOf(DELIMITER, currentIndex);
      // Accounts for the delimiter potentially being multiple characters long.
      const startDelimiterEndIndex = startDelimiterIndex + DELIMITER.length;

      if (startDelimiterIndex === -1) {
        // There's no more text to highlight so add the remaining content as un-highlighted text
        // and exit.
        segments.push({ value: textValue.substring(currentIndex) });
        break;
      }

      if (startDelimiterIndex > currentIndex) {
        // The delimiter is further ahead in the text, so add the current text up to the delimiter
        // as un-highlighted text.
        segments.push({
          value: textValue.substring(currentIndex, startDelimiterIndex),
          highlight: false,
        });
      }

      const endDelimiterIndex = textValue.indexOf(DELIMITER, startDelimiterEndIndex);
      if (endDelimiterIndex === -1) {
        // There's no end delimiter so treat the text as regular un-highlighted text.
        segments.push({ value: textValue.substring(startDelimiterIndex) });
        break;
      }

      // Add the Highlighted text.
      const highlightedText = textValue.substring(startDelimiterEndIndex, endDelimiterIndex);
      segments.push({ value: highlightedText, highlight: true });
      currentIndex = endDelimiterIndex + DELIMITER.length;
    }

    return segments;
  });
}
