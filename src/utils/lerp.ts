function lerp(from: number, to: number, t: number): number;
function lerp(
  from: [number, number, number],
  to: [number, number, number],
  t: number
): [number, number, number];
function lerp(
  from: [number, number],
  to: [number, number],
  t: number
): [number, number];
function lerp(from: number[], to: number[], t: number): number[];

function lerp(from: any, to: any, t: number): any {
  if (Array.isArray(from) && Array.isArray(to)) {
    if (from.length !== to.length) {
      throw new Error(
        `lerp: from and to must have the same length, but got ${from.length} and ${to.length}`
      );
    }

    return from.map((v, i) => lerp(v, to[i], t));
  } else {
    // Clamp t to the valid range
    const tClamped = Math.max(0, Math.min(1, t));
    return from + (to - from) * tClamped;
  }
}

export default lerp;
