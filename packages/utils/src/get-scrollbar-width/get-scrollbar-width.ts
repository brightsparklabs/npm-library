/*
 * Maintained by brightSPARK Labs.
 * www.brightsparklabs.com
 */

import { isPresent } from "../is-present/is-present";


// -------------------------------------------------------------------------------------------------
// PUBLIC METHODS
// -------------------------------------------------------------------------------------------------

let cachedScrollbarWidth: number | undefined;

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

