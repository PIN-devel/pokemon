import { RefObject, useEffect, useState } from "react";

export default function useInterSectionObserver(
  targetRef: RefObject<Element>,
  options: IntersectionObserverInit = {
    threshold: 0,
    root: null,
    rootMargin: "0px",
  }
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const isIntersecting = entry?.isIntersecting;
  const updateEntry = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setEntry(entry);
  };
  useEffect(() => {
    console.log("isIntersecting");
    const target = targetRef?.current;
    if (isIntersecting || !target) return;
    const observer = new IntersectionObserver(updateEntry, options);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    targetRef,
    options.root,
    options.rootMargin,
    options.threshold,
    isIntersecting,
  ]);
  return entry;
}
