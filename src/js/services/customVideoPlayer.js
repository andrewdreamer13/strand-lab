
/**
 * Dynamically mounts and initializes a Plyr video player instance for local video files or YouTube embeds.
 * 
 * 1. `initCustomPlayer` - Creates the appropriate video DOM node or YouTube embed container based on the provided media type and attaches a new Plyr player instance.
 */

//import Plyr from "plyr";

export const initCustomPlayer = async (container, { type, src }) => {
  const plyrModule = await import("plyr");
  const Plyr = plyrModule.default || plyrModule;

  let mediaElement;

  if (type === "youtube") {
    mediaElement = document.createElement("div");
    mediaElement.setAttribute("data-plyr-provider", "youtube");
    mediaElement.setAttribute("data-plyr-embed-id", src);
  } else {
    mediaElement = document.createElement("video");
    mediaElement.src = src;
    mediaElement.setAttribute("playsinline", "");
    mediaElement.setAttribute("controls", "");
  }

  container.innerHTML = "";
  container.appendChild(mediaElement);

  return new Plyr(mediaElement, {
    autoplay: true,
  });
};
