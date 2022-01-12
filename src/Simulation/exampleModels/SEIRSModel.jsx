import Model from "./Model";

class SEIRSModel extends Model  {
  constructor() {
  super("SEIRS-Model",
    [["E", 0.03, "#1F85DE"], ["I", 0.03, "#de1f50"], ["R", 0.03, "#b91fde"], ["S", 0.91, "#1fdea7"]],
    [[["S", "I"], ["I", "E"], 0.5],
      ["E", "I", 0.5],
      ["I", "R", 0.5],
      ["R", "S", 0.5]],
    20, 0.05);
  }
}

export default SEIRSModel;
