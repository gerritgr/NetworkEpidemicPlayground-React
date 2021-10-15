import Model from "./Model";

class SIModel extends Model  {
  constructor() {
    super("SIModel",
      [["S", 0.97, "#0FA75F"], ["I", 0.03, "#ff225b"]],
      [["S", "I", 0.5]],
      20, 0.05);
  }
}

export default SIModel;
