/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isPresent } from "../is-present/is-present";

// -------------------------------------------------------------------------------------------------
// CACHED VALUE
// -------------------------------------------------------------------------------------------------

let cachedScrollbarWidth: number | undefined;

// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

/**
 * Returns the width of a scrollbar on a page in pixels. Caches a default value after first use.
 * This cachedScrollbarWidth will then be returned by default to save computation. In the event
 * that cachedScrollbarWidth needs to be changed, this can be done by passing in a `true` value for 
 * updateCachedWidth.
 *
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

    /** Create a scrollable page container and find the width in pixels. */
    const scrollableContainer = document.createElement("div");
    scrollableContainer.style.visibility = "hidden";
    scrollableContainer.style.overflow = "scroll";
    // scrollableContainer.style.boxSizing = "border-box";
    // scrollableContainer.style.height = "10px";
    document.body.appendChild(scrollableContainer);
    const containerWidth = scrollableContainer.offsetWidth;

    /** Create a container without a scrollbar inside the scrollable container and find the width
     * in pixels.
     */
    const containerContent = document.createElement("div");
    // containerContent.style.boxSizing = "border-box";
    // containerContent.style.height = "20px";
    scrollableContainer.appendChild(containerContent);
    const contentWidth = containerContent.offsetWidth;

    scrollableContainer.parentNode!.removeChild(scrollableContainer);
    console.log(containerWidth, contentWidth);
    cachedScrollbarWidth = containerWidth - contentWidth;
    return cachedScrollbarWidth;
}

