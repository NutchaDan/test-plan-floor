export class DomUtils {
  static findSvgElement(container: Element): SVGSVGElement | null {
    return container.querySelector('svg') as SVGSVGElement;
  }

  static findRoomElement(
    svgElement: SVGSVGElement,
    roomId: string
  ): Element | null {
    const selectors = [
      `#${roomId}`,
      `[id="${roomId}"]`,
      `[data-id="${roomId}"]`,
      `[data-room-id="${roomId}"]`,
    ];

    for (const selector of selectors) {
      const element = svgElement.querySelector(selector);
      if (element) return element;
    }
    return null;
  }
}
