import { Message } from "ai/react";
import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollAnchor = (messages: Message[]) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const lastMessageRef = useRef<Message | null>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage !== lastMessageRef.current) {
        // New message added
        lastMessageRef.current = lastMessage;
        if (isAtBottom) {
          scrollToBottom();
        } else {
          setShowScrollButton(true);
        }
      } else if (autoScroll) {
        // Existing message updated
        scrollToBottom();
      }
    }
  }, [messages, isAtBottom, autoScroll, scrollToBottom]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const bottomThreshold = 20;
        const newIsAtBottom =
          scrollTop + clientHeight >= scrollHeight - bottomThreshold;

        setIsAtBottom(newIsAtBottom);
        setShowScrollButton(!newIsAtBottom);
        setAutoScroll(newIsAtBottom);
      }
    };

    const current = scrollRef.current;
    if (current) {
      current.addEventListener("scroll", handleScroll, { passive: true });
      return () => current.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleNewMessage = useCallback(() => {
    if (isAtBottom) {
      scrollToBottom();
    } else {
      setShowScrollButton(true);
    }
    setAutoScroll(true);
  }, [isAtBottom, scrollToBottom]);

  const handleManualScroll = () => {
    scrollToBottom();
    setAutoScroll(true);
    setShowScrollButton(false);
  };

  return {
    messagesRef,
    scrollRef,
    scrollToBottom,
    isAtBottom,
    showScrollButton,
    handleNewMessage,
    handleManualScroll,
  };
};
