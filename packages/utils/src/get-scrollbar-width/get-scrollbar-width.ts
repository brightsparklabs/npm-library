/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isPresent } from "../is-present/is-present";

// -------------------------------------------------------------------------------------------------
// INSTANCE VARIABLES
// -------------------------------------------------------------------------------------------------

/** 
 * Cached value of scrollbar width set by {@link getScrollbarWidth}.
 * Once it has been set, {@link getScrollbarWidth} will return this cached value to avoid redundant
 * computation, unless it is passed a boolean {@link updateCachedWidth} flag.
 */
export let cachedScrollbarWidth: number | undefined;

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Returns the width of a scrollbar on a page in pixels. Caches a default value after first use.
 * This {@link cachedScrollbarWidth} will then be returned by default to save computation.
 * In the event that {@link cachedScrollbarWidth} needs to be changed, this can be done by passing
 * in a `true` value for {@link updateCachedWidth} parameter.
 *
 * @param updateCachedWidth An optional boolean flag, false by default.
 * @returns The pixel width of the scrollbar as a number.
 */
export function getScrollbarWidth(
    updateCachedWidth: boolean = false
): number {
    /** Return the cachedScrollbarWidth if it exists and there is no need to update the value. */
    if (isPresent(cachedScrollbarWidth) && !updateCachedWidth ) {
        return cachedScrollbarWidth;
    }

    const scrollableContainer = document.createElement("div");
    scrollableContainer.style.visibility = "hidden";
    scrollableContainer.style.overflow = "scroll";
    document.body.appendChild(scrollableContainer);
    const containerWidth = scrollableContainer.offsetWidth;

    const containerContent = document.createElement("div");
    scrollableContainer.appendChild(containerContent);
    const contentWidth = containerContent.offsetWidth;

    scrollableContainer.parentNode!.removeChild(scrollableContainer);
    cachedScrollbarWidth = containerWidth - contentWidth;
    return cachedScrollbarWidth;
}

/**
 * Resets the cache back to undefined.
 * Necessary for testing the behaviour of {@link getScrollbarWidth} with an undefined cache value.
 */
export function resetCachedScrollbarWidth(): void {
    cachedScrollbarWidth = undefined;
}
