export const updateFavicon = (imageUrl, fallback = "/favicon.svg") => {
  const favicon = document.querySelector('link[rel="icon"]');

  if (!imageUrl) {
    if (favicon) {
      favicon.href = fallback;
    }

    return;
  }

  const img = new Image();

  img.crossOrigin = "anonymous";

  img.onload = () => {
    const size = 128;
    const canvas = document.createElement("canvas");

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    const cropSize = Math.min(img.naturalWidth, img.naturalHeight);

    const sx = (img.naturalWidth - cropSize) / 2;
    const sy = (img.naturalHeight - cropSize) / 2;

    // Rounded / circular clipping
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, size, size);

    if (favicon) {
      favicon.href = canvas.toDataURL("image/png");
    }
  };

  img.onerror = () => {
    if (favicon) {
      favicon.href = fallback;
    }
  };

  img.src = imageUrl;
};
