import BasicCalculator from "./BasicCalculator"


export default class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }

  public square() {
    this.value = this.value ** 2;
    return this;
  }

  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
}