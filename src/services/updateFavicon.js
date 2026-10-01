export const updateFavicon = (imageUrl, fallback = "/favicon.svg") => {
  if (!imageUrl) {
    const favicon = document.querySelector('link[rel="icon"]');

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

    ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, size, size);

    const favicon = document.querySelector('link[rel="icon"]');

    if (favicon) {
      favicon.href = canvas.toDataURL("image/png");
    }
  };

  img.onerror = () => {
    const favicon = document.querySelector('link[rel="icon"]');

    if (favicon) {
      favicon.href = fallback;
    }
  };

  img.src = imageUrl;
};
