import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Room } from '../../room/room.model';
import { DomUtils } from '../../shared/utils/dom.utils';
import { statusColors } from '../../shared/constants/room-status-colors.const';


@Injectable({ providedIn: 'root' })
export class FloorLayoutService {
  private renderer: Renderer2;
  rooms: Room[] = [];

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  applyRoomColors(container: Element, rooms: Room[]): void {
    const svgElement = container.querySelector('svg');
    if (!svgElement || !rooms?.length) return;

    rooms.forEach(room => {
      const elements = this.findRoomElements(svgElement, room.id);
      elements.forEach(el => {
        this.renderer.setAttribute(el, 'fill', statusColors[room.status] || '#ccc');
        this.renderer.setAttribute(el, 'data-room-id', room.id);
      });
    });
  }

  private findRoomElements(svgElement: SVGSVGElement, roomId: string): Element[] {
    const selectors = [
      `#${roomId}`,
      `[id="${roomId}"]`,
      `[data-id="${roomId}"]`,
      `[data-room-id="${roomId}"]`
    ];

    const elements: Element[] = [];
    selectors.forEach(selector => {
      const found = svgElement.querySelectorAll(selector);
      found.forEach(el => elements.push(el));
    });

    return elements;
  }

  highlightRoom(container: Element, roomId: string, rooms: Room[]): void {
    const svgElement = DomUtils.findSvgElement(container);
    if (!svgElement) return;

    this.resetHighlights(svgElement, rooms);
    this.applyHighlight(svgElement, roomId);
  }

  private resetHighlights(svgElement: SVGSVGElement, rooms: Room[]): void {
    const elements = svgElement.querySelectorAll('[data-room-id]');
    elements.forEach(el => {
      this.renderer.removeAttribute(el, 'stroke');
      this.renderer.removeAttribute(el, 'stroke-width');
    });
  }

  private applyHighlight(svgElement: SVGSVGElement, roomId: string): void {
    const elements = svgElement.querySelectorAll(`[data-room-id="${roomId}"]`);
    elements.forEach(el => {
      this.renderer.setAttribute(el, 'stroke', '#000');
      this.renderer.setAttribute(el, 'stroke-width', '2');
    });
  }
}
