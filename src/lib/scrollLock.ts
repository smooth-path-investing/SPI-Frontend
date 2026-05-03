const LOCK_COUNT_ATTRIBUTE = 'data-scroll-lock-count';
const HTML_OVERFLOW_ATTRIBUTE = 'data-scroll-lock-html-overflow';
const BODY_OVERFLOW_ATTRIBUTE = 'data-scroll-lock-body-overflow';
const BODY_TOUCH_ACTION_ATTRIBUTE = 'data-scroll-lock-body-touch-action';
const BODY_OVERSCROLL_ATTRIBUTE = 'data-scroll-lock-body-overscroll';

const getLockCount = (html: HTMLElement): number => {
  const rawValue = html.getAttribute(LOCK_COUNT_ATTRIBUTE);

  return rawValue ? Number.parseInt(rawValue, 10) || 0 : 0;
};

export const lockDocumentScroll = (): void => {
  const html = document.documentElement;
  const body = document.body;
  const currentLockCount = getLockCount(html);

  if (currentLockCount === 0) {
    html.setAttribute(HTML_OVERFLOW_ATTRIBUTE, html.style.overflow);
    body.setAttribute(BODY_OVERFLOW_ATTRIBUTE, body.style.overflow);
    body.setAttribute(BODY_TOUCH_ACTION_ATTRIBUTE, body.style.touchAction);
    body.setAttribute(BODY_OVERSCROLL_ATTRIBUTE, body.style.overscrollBehavior);
  }

  html.setAttribute(LOCK_COUNT_ATTRIBUTE, String(currentLockCount + 1));
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  body.style.touchAction = 'none';
  body.style.overscrollBehavior = 'none';
};

export const unlockDocumentScroll = (): void => {
  const html = document.documentElement;
  const body = document.body;
  const currentLockCount = getLockCount(html);

  if (currentLockCount <= 1) {
    html.style.overflow = html.getAttribute(HTML_OVERFLOW_ATTRIBUTE) ?? '';
    body.style.overflow = body.getAttribute(BODY_OVERFLOW_ATTRIBUTE) ?? '';
    body.style.touchAction = body.getAttribute(BODY_TOUCH_ACTION_ATTRIBUTE) ?? '';
    body.style.overscrollBehavior = body.getAttribute(BODY_OVERSCROLL_ATTRIBUTE) ?? '';

    html.removeAttribute(LOCK_COUNT_ATTRIBUTE);
    html.removeAttribute(HTML_OVERFLOW_ATTRIBUTE);
    body.removeAttribute(BODY_OVERFLOW_ATTRIBUTE);
    body.removeAttribute(BODY_TOUCH_ACTION_ATTRIBUTE);
    body.removeAttribute(BODY_OVERSCROLL_ATTRIBUTE);

    return;
  }

  html.setAttribute(LOCK_COUNT_ATTRIBUTE, String(currentLockCount - 1));
};
