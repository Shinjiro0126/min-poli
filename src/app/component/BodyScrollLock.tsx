"use client";
import useBodyScrollLock from "../hook/useBodyScrollLock";

export default function BodyScrollLock({ isLocked }: { isLocked: boolean }) {
  useBodyScrollLock(isLocked);

  return null;
}
