import Util from "../utils/Util";
import Span from "../math/Span";
import Behaviour from "./Behaviour";

export default class Alpha extends Behaviour {
  
  constructor(a, b, life, easing) {
    super(life, easing);

    this.reset(a, b);
    this.name = "Alpha";
  }

 
  reset(a, b, life, easing) {
    this.same = b === null || b === undefined ? true : false;
    this.a = Span.setSpanValue(Util.initValue(a, 1));
    this.b = Span.setSpanValue(b);

    life && super.reset(life, easing);
  }

  
  initialize(particle) {
    particle.data.alphaA = this.a.getValue();

    if (this.same) particle.data.alphaB = particle.data.alphaA;
    else particle.data.alphaB = this.b.getValue();
  }

 
  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);

    particle.alpha = particle.data.alphaB + (particle.data.alphaA - particle.data.alphaB) * this.energy;

    if (particle.alpha < 0.001) particle.alpha = 0;
  }
}
