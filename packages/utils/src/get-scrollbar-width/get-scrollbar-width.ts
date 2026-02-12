/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isPresent } from "../is-present/is-present";

// -------------------------------------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------------------------------------

/** 
 * Type to hold the cachedScrollbarWidth value in.
 * The object is necessary for testing, so that the cached value can be reset to undefined from
 * the testing file.
 */
type ScrollbarWidth = {
    cachedScrollbarWidth: number | undefined;
};

// -------------------------------------------------------------------------------------------------
// INSTANCE VARIABLES
// -------------------------------------------------------------------------------------------------

/** 
 * Object to hold the cached value of scrollbar width set by {@link getScrollbarWidth}.
 * Once it has been set, {@link getScrollbarWidth} will return this cached value to avoid redundant
 * computation, unless it is passed a boolean {@link updateCachedWidth} flag.
 */
export let scrollbarWidth:ScrollbarWidth = {
    cachedScrollbarWidth: undefined
}; 

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
    if (isPresent(scrollbarWidth.cachedScrollbarWidth) && !updateCachedWidth ) {
        return scrollbarWidth.cachedScrollbarWidth;
    };

    const scrollableContainer = document.createElement("div");
    scrollableContainer.style.visibility = "hidden";
    scrollableContainer.style.overflow = "scroll";
    document.body.appendChild(scrollableContainer);
    const containerWidth = scrollableContainer.offsetWidth;

    const containerContent = document.createElement("div");
    scrollableContainer.appendChild(containerContent);
    const contentWidth = containerContent.offsetWidth;

    scrollableContainer.parentNode!.removeChild(scrollableContainer);
    scrollbarWidth.cachedScrollbarWidth = containerWidth - contentWidth;
    return scrollbarWidth.cachedScrollbarWidth;
}
