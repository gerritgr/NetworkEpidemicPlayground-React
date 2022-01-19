import Model from "./Model";

class SIModel extends Model  {
  constructor() {
    super("SI-Model",
      [["S", 0.9, "#0FA75F"], ["I", 0.1, "#ff225b"]],
      [[["I", "S"],["I", "I"], 0.5]],
      20, 0.05);
  }
}

export default SIModel;
