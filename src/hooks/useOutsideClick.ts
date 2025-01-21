import React, { useCallback, useEffect } from 'react';

export const useOutsideClick = (
    ref: React.MutableRefObject<HTMLDivElement | null> | null,
    cb: () => void,
    active = true,
    triggerRef?: React.MutableRefObject<HTMLDivElement | null> | null,
) => {
    const outSideClickHandler = useCallback(
        (e: MouseEvent | TouchEvent) => {
            e.stopPropagation();
            if (!ref?.current) return;

            const ignoreElements = [ref?.current];
            if (triggerRef?.current) {
                ignoreElements.push(triggerRef?.current);
            }
            if (!ignoreElements.some((element) => element?.contains(e?.target as Node))) {
                cb();
            }
        },
        [cb, ref, triggerRef],
    );

    useEffect(() => {
        if (active) {
            document.addEventListener('click', outSideClickHandler, false);
            document.addEventListener('touchend', outSideClickHandler, false);
        }
        return () => {
            if (active) {
                document.removeEventListener('click', outSideClickHandler, false);
                document.removeEventListener('touchend', outSideClickHandler, false);
            }
        };
    }, [active, outSideClickHandler]);
};
