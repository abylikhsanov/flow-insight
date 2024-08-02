export class FixedSizeWindow {
  private window: number[];
  private size: number;

  constructor(size: number) {
    this.size = size;
    this.window = new Array(size).fill(0);
  }

  addValue(value: number): void {
    for (let i = 0; i < this.size - 1; i++) {
      this.window[i] = this.window[i + 1];
    }
    this.window[this.size - 1] = value;
  }

  getWindow(): number[] {
    return this.window;
  }

  resizeWindow(newSize: number): void {
    if (newSize < 1) {
      throw new Error("Window size must be at least 1");
    }

    if (newSize < this.size) {
      this.window = this.window.slice(this.size - newSize);
    } else if (newSize > this.size) {
      this.window = [...new Array(newSize - this.size).fill(0), ...this.window];
    }

    this.size = newSize;
  }
}
