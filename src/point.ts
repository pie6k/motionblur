export interface Point {
  x: number;
  y: number;
}

export function copyPoint(point: Point): Point {
  return {
    ...point,
  };
}

export function subtractPoints(a: Point, b: Point): Point {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
}
