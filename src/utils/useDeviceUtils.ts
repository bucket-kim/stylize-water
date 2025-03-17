const isMobile = () => {
  const userAgent = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );
};

export const getDevicePixelRatio = () => {
  const desktopMaxPixelRatio = 1;
  const mobileMaxPixelRatio = 1;
  if (isMobile()) {
    return Math.min(mobileMaxPixelRatio, window.devicePixelRatio);
  }
  return Math.min(desktopMaxPixelRatio, window.devicePixelRatio);
};
