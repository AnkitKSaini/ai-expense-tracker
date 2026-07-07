import { toPng } from "html-to-image";

export async function chartToImage(
  element: HTMLElement
) {
  return await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
  });
}