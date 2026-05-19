// src/hooks/useDisclosure.test.ts
import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDisclosure } from './useDisclosure';

describe('useDisclosure', () => {
  it('starts closed by default', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('starts open when defaultOpen=true', () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('opens when open() is called', () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('closes when close() is called', () => {
    const { result } = renderHook(() => useDisclosure(true));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it('toggles state', () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it('returns stable function references', () => {
    const { result, rerender } = renderHook(() => useDisclosure());
    const { open: open1, close: close1, toggle: toggle1 } = result.current;
    rerender();
    expect(result.current.open).toBe(open1);
    expect(result.current.close).toBe(close1);
    expect(result.current.toggle).toBe(toggle1);
  });
});
