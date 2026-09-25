/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { getWorkExperiences } from "../../../../../services/projectService";

const useWorkExperiences = () => {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableScrollRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const draggingRef = useRef(false);

  const fetchWorkExperiences = async () => {
    setLoading(true);

    const data = await getWorkExperiences();

    setWorkExperiences(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkExperiences();
  }, []);

  useEffect(() => {
    const scroll = tableScrollRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!scroll || !track || !thumb) return;

    const updateThumb = () => {
      const contentWidth = scroll.scrollWidth;
      const visibleWidth = scroll.clientWidth;
      const trackWidth = track.clientWidth;

      if (contentWidth <= visibleWidth) {
        thumb.style.width = "100%";
        thumb.style.left = "0px";
        return;
      }

      const thumbWidth = Math.max(
        (visibleWidth / contentWidth) * trackWidth,
        40,
      );

      const maxLeft = trackWidth - thumbWidth;
      const maxScroll = contentWidth - visibleWidth;

      const left = (scroll.scrollLeft / maxScroll) * maxLeft;

      thumb.style.width = `${thumbWidth}px`;
      thumb.style.left = `${left}px`;
    };

    const handlePointerDown = (e) => {
      e.preventDefault();
      draggingRef.current = true;
      thumb.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
      if (!draggingRef.current) return;

      const rect = track.getBoundingClientRect();
      const thumbWidth = thumb.offsetWidth;
      const maxLeft = track.clientWidth - thumbWidth;

      let left = e.clientX - rect.left - thumbWidth / 2;

      left = Math.max(0, Math.min(left, maxLeft));

      const ratio = left / maxLeft;

      scroll.scrollLeft = ratio * (scroll.scrollWidth - scroll.clientWidth);
    };

    const handlePointerUp = () => {
      draggingRef.current = false;
    };

    thumb.addEventListener("pointerdown", handlePointerDown);
    thumb.addEventListener("pointermove", handlePointerMove);
    thumb.addEventListener("pointerup", handlePointerUp);
    scroll.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    updateThumb();

    return () => {
      thumb.removeEventListener("pointerdown", handlePointerDown);
      thumb.removeEventListener("pointermove", handlePointerMove);
      thumb.removeEventListener("pointerup", handlePointerUp);
      scroll.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, [workExperiences]);

  return {
    workExperiences,
    loading,
    getWorkExperiences,
    tableScrollRef,
    trackRef,
    thumbRef,
  };
};

export default useWorkExperiences;
